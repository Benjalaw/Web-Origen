(()=>{
function injectShopHome(){
  if(!(location.hash===''||location.hash==='#'||location.hash==='#/'))return;
  if(document.querySelector('[data-home-shop]'))return;
  const grids=[...document.querySelectorAll('.section .grid')];
  const target=grids.find(g=>g.querySelector('a[href="#/volcanes"]')||g.querySelector('a[href="#/rutas"]'))||grids[0];
  if(!target)return;
  const card=document.createElement('a');
  card.href='#/tienda';
  card.className='card place-card home-shop-card';
  card.dataset.homeShop='1';
  card.innerHTML=`<div class="card-media home-shop-media"><img src="assets/origen-logo.svg" alt="Tienda ORIGEN"></div><div class="card-body"><span class="tag">Próximamente</span><h3>Tienda ORIGEN</h3><p>Stickers de ORI, ropa, accesorios y productos inspirados en viajar por Chile.</p><span class="go">Conocer la tienda →</span></div>`;
  target.appendChild(card);
}
function markNav(){const a=document.querySelector('#nav a[href="#/tienda"]');if(a)a.classList.add('nav-shop-link');}
function run(){markNav();setTimeout(injectShopHome,0);setTimeout(injectShopHome,80);}
addEventListener('hashchange',run);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();