import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS'
}

Deno.serve(async(req:Request)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:corsHeaders})
  if(req.method!=='POST')return Response.json({error:'Method not allowed'},{status:405,headers:corsHeaders})

  const supabaseUrl=Deno.env.get('SUPABASE_URL')||''
  const publicKey=Deno.env.get('SUPABASE_ANON_KEY')||Deno.env.get('SUPABASE_PUBLISHABLE_KEY')||''
  const secretKey=Deno.env.get('SUPABASE_SECRET_KEY')||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')||''
  const resendKey=Deno.env.get('RESEND_API_KEY')||''
  const fromEmail=Deno.env.get('FROM_EMAIL')||''
  const admins=(Deno.env.get('ADMIN_EMAILS')||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean)
  if(!supabaseUrl||!publicKey||!secretKey||!resendKey||!fromEmail)return Response.json({error:'Server email configuration incomplete'},{status:500,headers:corsHeaders})

  const authHeader=req.headers.get('Authorization')||''
  const token=authHeader.replace(/^Bearer\s+/i,'')
  if(!token)return Response.json({error:'Unauthorized'},{status:401,headers:corsHeaders})

  const publicClient=createClient(supabaseUrl,publicKey,{auth:{persistSession:false,autoRefreshToken:false}})
  const {data:userData,error:userError}=await publicClient.auth.getUser(token)
  const requester=userData.user
  if(userError||!requester?.email||!admins.includes(requester.email.toLowerCase()))return Response.json({error:'Forbidden'},{status:403,headers:corsHeaders})

  let body:{subject?:string;html?:string;text?:string}={}
  try{body=await req.json()}catch{}
  const subject=String(body.subject||'').trim()
  const html=String(body.html||'').trim()
  const text=String(body.text||'').trim()
  if(!subject||(!html&&!text))return Response.json({error:'subject and html/text are required'},{status:400,headers:corsHeaders})
  if(subject.length>180)return Response.json({error:'Subject too long'},{status:400,headers:corsHeaders})

  const admin=createClient(supabaseUrl,secretKey,{auth:{persistSession:false,autoRefreshToken:false}})
  const recipients:string[]=[]
  let page=1
  while(page<=20){
    const {data,error}=await admin.auth.admin.listUsers({page,perPage:1000})
    if(error)return Response.json({error:error.message},{status:500,headers:corsHeaders})
    const users=data.users||[]
    for(const user of users){
      if(user.email&&user.user_metadata?.marketing_opt_in===true)recipients.push(user.email)
    }
    if(users.length<1000)break
    page++
  }

  let sent=0,failed=0
  for(let i=0;i<recipients.length;i+=10){
    const batch=recipients.slice(i,i+10)
    const results=await Promise.allSettled(batch.map(async(to)=>{
      const r=await fetch('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${resendKey}`},
        body:JSON.stringify({from:fromEmail,to:[to],subject,html:html||undefined,text:text||undefined})
      })
      if(!r.ok)throw new Error(await r.text())
    }))
    for(const result of results)result.status==='fulfilled'?sent++:failed++
  }

  return Response.json({ok:true,total:recipients.length,sent,failed},{headers:{...corsHeaders,'Content-Type':'application/json'}})
})
