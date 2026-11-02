(()=>{
const C=window.ORI_SERVICES?.cities;if(!C)return;
Object.assign(C,{
"Arica":{region:"Arica y Parinacota",aliases:["arica"],items:[
{name:"Antay Hotel & Spa",type:"hotel",trust:"sernatur-listed",why:"Hotel incluido actualmente en los resultados de SERNATUR para Arica.",source:"https://serviciosturisticos.sernatur.cl/resultado.php?comuna_nombre=ARICA&page=1"},
{name:"Restaurante Medina's",type:"restaurant",trust:"recommended",why:"Restaurante peruano muy bien valorado por viajeros y locales.",maps:"Restaurante Medina's Arica Chile"},
{name:"Arica Restobar",type:"bar",trust:"recommended",why:"Restobar conocido por coctelería, cerveza y ambiente nocturno.",maps:"Arica Restobar Chile"},
{name:"Morro de Arica",type:"experience",trust:"recommended",why:"Mirador e hito histórico principal de la ciudad, con vista al litoral.",maps:"Morro de Arica Chile"}
]},
"Iquique":{region:"Tarapacá",aliases:["iquique"],items:[
{name:"Hotel Gavina Costa Mar",type:"hotel",trust:"sernatur-listed",why:"Hotel listado actualmente por SERNATUR para Iquique.",source:"https://serviciosturisticos.sernatur.cl/resultado.php?comuna_nombre=Iquique&nombre="},
{name:"Barsovia",type:"bar",trust:"recommended",why:"Bar y grill céntrico conocido por cerveza, coctelería y ambiente social.",maps:"Barsovia Iquique Chile"},
{name:"Restaurante Neptuno",type:"restaurant",trust:"recommended",why:"Restaurante de tradición marina en el casco histórico de Iquique.",maps:"Restaurante Neptuno Iquique Chile"},
{name:"Torre del Reloj",type:"experience",trust:"recommended",why:"Hito patrimonial de Plaza Prat y una parada clásica del centro histórico.",maps:"Torre del Reloj Iquique Chile"}
]},
"Antofagasta":{region:"Antofagasta",aliases:["antofagasta"],items:[
{name:"Hotel Agua del Desierto",type:"hotel",trust:"sernatur-listed",why:"Alojamiento incluido actualmente en el buscador regional de SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/nueva_busqueda.php?clase_servicio=0&comuna=0&page=1&region=2&tipo_servicio=1"},
{name:"Amares Bistro",type:"restaurant",trust:"recommended",why:"Restaurante muy bien valorado por su cocina peruana y propuesta cuidada.",maps:"Amares Bistro Antofagasta Chile"},
{name:"Bardos Antofagasta",type:"bar",trust:"recommended",why:"Gastropub enfocado en cerveza, música y ambiente nocturno.",maps:"Bardos Antofagasta Chile"},
{name:"Balneario Municipal",type:"experience",trust:"recommended",why:"Playa urbana clásica para recorrer la costanera y disfrutar el borde costero.",maps:"Balneario Municipal Antofagasta Chile"}
]},
"Calama":{region:"Antofagasta",aliases:["calama"],items:[
{name:"Hotel Agua del Desierto",type:"hotel",trust:"sernatur-listed",why:"Hotel incluido en la oferta regional de alojamiento del buscador SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/nueva_busqueda.php?clase_servicio=0&comuna=0&page=1&region=2&tipo_servicio=1"},
{name:"Casa Bau",type:"restaurant",trust:"recommended",why:"Café, restaurante y bar moderno con buena reputación entre viajeros.",maps:"Casa Bau Calama Chile"},
{name:"Pub El Mexicano",type:"bar",trust:"recommended",why:"Pub conocido en Calama por su ambiente rockero y cervezas.",maps:"Pub El Mexicano Calama Chile"},
{name:"Lantur Calama Servicios Turísticos",type:"experience",trust:"sernatur",why:"Agencia receptiva y emisiva con registro vigente en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/46197-lantur-calama-servicios-turisticos-spa"}
]},
"Copiapó":{region:"Atacama",aliases:["copiapo","copiapó"],items:[
{name:"Hotel Atacama Suites",type:"hotel",trust:"recommended",why:"Hotel céntrico conocido por habitaciones amplias y ubicación práctica.",maps:"Hotel Atacama Suites Copiapó Chile"},
{name:"Machu Picchu Copiapó",type:"restaurant",trust:"recommended",why:"Restaurante peruano muy bien valorado cerca del centro.",maps:"Machu Picchu Copiapó Chile"},
{name:"Pub La Torre",type:"bar",trust:"recommended",why:"Pub de referencia para coctelería, picoteo y ambiente nocturno.",maps:"Pub La Torre Copiapó Chile"}
]},
"Caldera":{region:"Atacama",aliases:["caldera","bahia inglesa","bahía inglesa"],items:[
{name:"Hotel Costa Fósil",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente en SERNATUR en Caldera.",source:"https://serviciosturisticos.sernatur.cl/272-hotel-costa-fosil"},
{name:"Portal del Inca",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/5191-portal-del-inca"},
{name:"Restaurant La Bahía",type:"restaurant",trust:"recommended",why:"Restaurante de pescados y mariscos en el terminal pesquero de Caldera.",maps:"Restaurant La Bahía Caldera Chile"},
{name:"Pub Entre Jotes",type:"bar",trust:"recommended",why:"Pub-restaurante frente al borde costero con ambiente informal.",maps:"Entre Jotes Caldera Chile"},
{name:"Playa Mansa",type:"experience",trust:"recommended",why:"Playa urbana de aguas relativamente protegidas y fácil acceso desde el centro.",maps:"Playa Mansa Caldera Chile"}
]},
"Coquimbo":{region:"Coquimbo",aliases:["coquimbo","peñuelas","penuelas"],items:[
{name:"Enjoy Coquimbo - Hotel de la Bahía",type:"hotel",trust:"recommended",why:"Complejo hotelero y de entretenimiento frente al mar en Peñuelas.",maps:"Enjoy Coquimbo Hotel de la Bahía Chile"},
{name:"Restaurant Magnolia",type:"restaurant",trust:"recommended",why:"Restaurante muy bien valorado en La Herradura por sabor y cocina cuidada.",maps:"Restaurant Magnolia Coquimbo Chile"},
{name:"Blue Moon",type:"bar",trust:"recommended",why:"Bar, terraza y espacio nocturno en el Barrio Inglés.",maps:"Blue Moon Coquimbo Chile"},
{name:"Cruz del Tercer Milenio",type:"experience",trust:"recommended",why:"Mirador monumental con vistas amplias de la bahía y la conurbación.",maps:"Cruz del Tercer Milenio Coquimbo Chile"}
]},
"Viña del Mar":{region:"Valparaíso",aliases:["vina del mar","viña del mar","vina"],items:[
{name:"Pullman Viña del Mar San Martín",type:"hotel",trust:"recommended",why:"Hotel moderno junto al borde costero y cercano a restaurantes y playas.",maps:"Pullman Viña del Mar San Martín Chile"},
{name:"Don Emelio Restaurante",type:"restaurant",trust:"recommended",why:"Restaurante contemporáneo muy bien valorado por cocina de mar y servicio.",maps:"Don Emelio Restaurante Viña del Mar Chile"},
{name:"Cervecería O'H",type:"bar",trust:"recommended",why:"Restobar cervecero conocido del sector Poniente.",maps:"Cervecería OH Viña del Mar Chile"},
{name:"Muelle Vergara",type:"experience",trust:"recommended",why:"Paseo costero clásico entre playas Acapulco y El Sol.",maps:"Muelle Vergara Viña del Mar Chile"}
]},
"Rancagua":{region:"O’Higgins",aliases:["rancagua"],items:[
{name:"Hotel Mar Andino",type:"hotel",trust:"recommended",why:"Hotel céntrico y práctico para estadías urbanas o viajes por O'Higgins.",maps:"Hotel Mar Andino Rancagua Chile"},
{name:"Restobar de Don Teo",type:"restaurant",trust:"recommended",why:"Restaurante peruano reconocido por su singular comedor en un antiguo vagón.",maps:"Restobar de Don Teo Rancagua Chile"},
{name:"Barley Terraza Restobar",type:"bar",trust:"recommended",why:"Restobar céntrico con ambiente rockero, cerveza y coctelería.",maps:"Barley Terraza Restobar Rancagua Chile"},
{name:"Museo Regional de Rancagua",type:"experience",trust:"recommended",why:"Museo patrimonial dedicado a historia regional y vida colonial.",maps:"Museo Regional de Rancagua Chile"}
]},
"Santa Cruz":{region:"O’Higgins",aliases:["santa cruz","colchagua"],items:[
{name:"Hotel Santa Cruz Plaza",type:"hotel",trust:"sernatur-listed",why:"Hotel reconocido del Valle de Colchagua e incluido en resultados regionales de SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/nueva_busqueda.php?clase_servicio=0&comuna=0&nombre=&page=1&region=6&tipo_servicio=0"},
{name:"Sazones SRP",type:"restaurant",trust:"recommended",why:"Restaurante peruano y gastropub bien valorado en Santa Cruz.",maps:"Sazones SRP Santa Cruz Chile"},
{name:"Cervecería Katarkura",type:"bar",trust:"recommended",why:"Cervecería artesanal local con ambiente íntimo y cerveza de la casa.",maps:"Cervecería Katarkura Santa Cruz Chile"},
{name:"Museo de Colchagua",type:"experience",trust:"recommended",why:"Museo de referencia regional, ideal para complementar una ruta de viñas.",maps:"Museo de Colchagua Santa Cruz Chile"}
]},
"Pichilemu":{region:"O’Higgins",aliases:["pichilemu","punta de lobos"],items:[
{name:"Lodge del Mar",type:"hotel",trust:"recommended",why:"Alojamiento frente al mar en Playa Hermosa con muy buena reputación.",maps:"Lodge del Mar Pichilemu Chile"},
{name:"Restaurante Comida Rica",type:"restaurant",trust:"recommended",why:"Restaurante conocido por producto fresco y cocina de temporada.",maps:"Restaurante Comida Rica Pichilemu Chile"},
{name:"Bar Playero",type:"bar",trust:"recommended",why:"Restobar costero orientado a atardeceres, tragos y ambiente playero.",maps:"Bar Playero Pichilemu Chile"},
{name:"Punta de Lobos",type:"experience",trust:"recommended",why:"Reserva costera y uno de los paisajes de surf más emblemáticos de Chile.",maps:"Punta de Lobos Pichilemu Chile"}
]},
"Talca":{region:"Maule",aliases:["talca"],items:[
{name:"Hotel Marcos Gamero",type:"hotel",trust:"recommended",why:"Hotel céntrico, próximo a la Plaza de Armas y útil como base urbana.",maps:"Hotel Marcos Gamero Talca Chile"},
{name:"Lo de Julio",type:"restaurant",trust:"recommended",why:"Restaurante reconocido por pescados, mariscos y carnes.",maps:"Lo de Julio Talca Chile"},
{name:"La Cleta Restobar",type:"bar",trust:"recommended",why:"Restobar de ambiente rockero con cerveza, hamburguesas y picoteos.",maps:"La Cleta Restobar Talca Chile"},
{name:"Cerro La Virgen",type:"experience",trust:"recommended",why:"Mirador urbano clásico para obtener panorámicas de Talca.",maps:"Cerro La Virgen Talca Chile"}
]},
"Curicó":{region:"Maule",aliases:["curico","curicó"],items:[
{name:"Hotel Diego de Almagro Curicó",type:"hotel",trust:"recommended",why:"Hotel céntrico con piscina y servicios orientados a viajeros de paso y negocios.",maps:"Hotel Diego de Almagro Curicó Chile"},
{name:"Fuego Bendito",type:"restaurant",trust:"recommended",why:"Restaurante conocido por carnes a la parrilla y carta de vinos.",maps:"Fuego Bendito Curicó Chile"}
]},
"Chillán":{region:"Ñuble",aliases:["chillan","chillán"],items:[
{name:"Hotel Diego de Almagro Chillán",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente y cumplimiento de inspección en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/11560-hotel-diego-de-almagro"},
{name:"MDS Hotel Chillán",type:"hotel",trust:"recommended",why:"Hotel moderno integrado al complejo Marina del Sol.",maps:"MDS Hotel Chillán Chile"},
{name:"Ficus Restaurante",type:"restaurant",trust:"recommended",why:"Restaurante tradicional de pizzas, pastas y parrilla.",maps:"Ficus Restaurante Chillán Chile"},
{name:"Bar Prócer",type:"bar",trust:"recommended",why:"Brewpub conocido por cerveza, pizzas y ambiente social.",maps:"Bar Prócer Chillán Chile"},
{name:"Mercado de Chillán",type:"experience",trust:"recommended",why:"Mercado central ideal para conocer productos, artesanía y longaniza de Ñuble.",maps:"Mercado de Chillán Chile"}
]},
"Los Ángeles":{region:"Biobío",aliases:["los angeles","los ángeles"],items:[
{name:"Hotel Salto del Laja",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente en SERNATUR, en el corredor turístico de Los Ángeles.",source:"https://serviciosturisticos.sernatur.cl/249-hotel-salto-del-laja"},
{name:"Four Points by Sheraton Los Angeles",type:"hotel",trust:"recommended",why:"Hotel urbano de cadena internacional en el centro de Los Ángeles.",maps:"Four Points by Sheraton Los Angeles Chile"},
{name:"Delicias de Máncora",type:"restaurant",trust:"recommended",why:"Restaurante peruano céntrico conocido por platos abundantes y servicio rápido.",maps:"Delicias de Mancora Los Ángeles Chile"},
{name:"Quinta Newka",type:"bar",trust:"recommended",why:"Gastropub con coctelería, música en vivo y eventos culturales.",maps:"Quinta Newka Los Ángeles Chile"},
{name:"Laguna Esmeralda",type:"experience",trust:"recommended",why:"Parque urbano y laguna histórica para una pausa al aire libre.",maps:"Laguna Esmeralda Los Ángeles Chile"}
]},
"Temuco":{region:"La Araucanía",aliases:["temuco"],items:[
{name:"Hotel Dreams Araucanía",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente e inspección cumplida en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/2652-hotel-dreams-araucania"},
{name:"DC Araucanía",type:"restaurant",trust:"recommended",why:"Restaurante reconocido por cocina chilena contemporánea y producto regional.",maps:"DC Araucanía Temuco Chile"},
{name:"La Cantina del Diablo",type:"bar",trust:"recommended",why:"Bar de cerveza artesanal con identidad rock y metal.",maps:"La Cantina del Diablo Temuco Chile"},
{name:"Cerro Ñielol",type:"experience",trust:"recommended",why:"Área natural urbana con bosque nativo, miradores y relevancia cultural mapuche.",maps:"Cerro Ñielol Temuco Chile"}
]},
"Villarrica":{region:"La Araucanía",aliases:["villarrica"],items:[
{name:"Hotel El Ciervo",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente y cumplimiento de inspección en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/53595-hotel-el-ciervo"},
{name:"Park Lake Luxury Hotel",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente e inspección cumplida en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/59012-park-lake-luxury-hotel"},
{name:"La Mesa del Sur",type:"restaurant",trust:"recommended",why:"Restaurante familiar conocido por cocina casera del sur de Chile.",maps:"La Mesa del Sur Villarrica Chile"},
{name:"Delirium Tremens Resto Bar",type:"bar",trust:"recommended",why:"Restobar conocido por cerveza, coctelería y ambiente nocturno.",maps:"Delirium Tremens Villarrica Chile"},
{name:"Parque Nacional Villarrica",type:"experience",trust:"recommended",why:"Área protegida de montaña con senderos, nieve y paisajes volcánicos.",maps:"Parque Nacional Villarrica Chile"}
]},
"Angol":{region:"La Araucanía",aliases:["angol"],items:[
{name:"202 Hotel Boutique",type:"hotel",trust:"recommended",why:"Hotel boutique céntrico, bien valorado por comodidad y atención.",maps:"202 Hotel Boutique Angol Chile"},
{name:"Bar Restaurant Ancash",type:"restaurant",trust:"recommended",why:"Restaurante-bar peruano con carta amplia y ambiente céntrico.",maps:"Ancash Angol Chile"}
]},
"Osorno":{region:"Los Lagos",aliases:["osorno"],items:[
{name:"Sonesta Hotel Osorno",type:"hotel",trust:"recommended",why:"Hotel de alta gama junto al río Rahue y el complejo Plaza Sol de los Lagos.",maps:"Sonesta Hotel Osorno Chile"},
{name:"Restaurant Los Gauchos",type:"restaurant",trust:"recommended",why:"Parrilla conocida por carnes y platos abundantes.",maps:"Restaurant Los Gauchos Osorno Chile"},
{name:"TryBar Osorno",type:"bar",trust:"recommended",why:"Bar destacado por coctelería, ambiente acogedor y buena reputación local.",maps:"TryBar Osorno Chile"},
{name:"Plaza de Armas de Osorno",type:"experience",trust:"recommended",why:"Centro cívico y punto de partida práctico para recorrer el casco urbano.",maps:"Plaza de Armas Osorno Chile"}
]},
"Puerto Montt":{region:"Los Lagos",aliases:["puerto montt"],items:[
{name:"Portal Austral",type:"hotel",trust:"sernatur",why:"Alojamiento familiar con registro vigente e inspección cumplida en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/18043-portal-austral"},
{name:"Hotel Gran Pacífico",type:"hotel",trust:"recommended",why:"Hotel céntrico con vistas a la bahía y restaurante panorámico.",maps:"Hotel Gran Pacifico Puerto Montt Chile"},
{name:"Recomiendo Cortes",type:"restaurant",trust:"recommended",why:"Parrillada muy bien valorada por cortes y platos para compartir.",maps:"Recomiendo Cortes Puerto Montt Chile"},
{name:"La Nube",type:"bar",trust:"recommended",why:"Restobar popular de ambiente animado, música y comida para compartir.",maps:"La Nube Puerto Montt Chile"},
{name:"Mirador Manuel Montt",type:"experience",trust:"recommended",why:"Mirador urbano para orientarse y observar la bahía desde altura.",maps:"Mirador Manuel Montt Puerto Montt Chile"}
]},
"Castro":{region:"Los Lagos",aliases:["castro","chiloe","chiloé"],items:[
{name:"Hotel de Castro",type:"hotel",trust:"sernatur-listed",why:"Hotel incluido en la oferta de alojamiento publicada por SERNATUR para Los Lagos.",source:"https://serviciosturisticos.sernatur.cl/nueva_busqueda.php?clase_servicio=42&comuna=0&nombre=&page=1&region=10&tipo_servicio=1"},
{name:"Restaurant Travesía",type:"restaurant",trust:"recommended",why:"Restaurante chilote reconocido por cocina basada en patrimonio culinario local.",maps:"Restaurant Travesía Castro Chile"},
{name:"Barra Cervecera",type:"bar",trust:"recommended",why:"Bar y cervecería con amplia selección de cervezas y ambiente informal.",maps:"Barra Cervecera Castro Chile"},
{name:"Mirador Gamboa",type:"experience",trust:"recommended",why:"Uno de los puntos clásicos para observar los palafitos de Castro.",maps:"Mirador Gamboa Castro Chile"}
]},
"Ancud":{region:"Los Lagos",aliases:["ancud"],items:[
{name:"Hostal Austral",type:"hotel",trust:"recommended",why:"Alojamiento céntrico muy bien valorado, cercano al terminal de buses.",maps:"Hostal Austral Ancud Chile"},
{name:"Club Social Baquedano",type:"restaurant",trust:"recommended",why:"Restaurante-bar conocido por cocina con producto local y ambiente animado.",maps:"Club Social Baquedano Ancud Chile"},
{name:"La Casa Growler y Restobar",type:"bar",trust:"recommended",why:"Gastropub conocido por cerveza, coctelería y comida abundante.",maps:"La Casa Growler Ancud Chile"},
{name:"Museo Regional de Ancud",type:"experience",trust:"recommended",why:"Museo público para conocer historia y patrimonio marítimo de Chiloé.",maps:"Museo Regional de Ancud Chile"}
]},
"Chaitén":{region:"Los Lagos",aliases:["chaiten","chaitén"],items:[
{name:"Chucao Bosque y Cabañas",type:"hotel",trust:"recommended",why:"Cabañas de ambiente natural, cerca del centro y pensadas para viajeros de Carretera Austral.",maps:"Chucao Bosque y Cabañas Chaitén Chile"},
{name:"Cocinería El Paso",type:"restaurant",trust:"recommended",why:"Cocinería local muy bien valorada por platos caseros y precios razonables.",maps:"Cocinería El Paso Chaitén Chile"},
{name:"Cerveza Wechun",type:"bar",trust:"recommended",why:"Pequeña cervecería y bar artesanal muy apreciado por viajeros.",maps:"Cerveza Wechun Chaitén Chile"}
]},
"Futaleufú":{region:"Los Lagos",aliases:["futaleufu","futaleufú"],items:[
{name:"Peuma Lodge Patagonia",type:"hotel",trust:"sernatur",why:"Lodge con registro vigente en SERNATUR en el sector El Azul.",source:"https://serviciosturisticos.sernatur.cl/13224-hotel-turismo-patagonia-verde"},
{name:"Hotel El Barranco",type:"hotel",trust:"recommended",why:"Hotel de montaña céntrico y muy bien valorado por viajeros.",maps:"Hotel El Barranco Futaleufú Chile"},
{name:"Martín Pescador",type:"restaurant",trust:"recommended",why:"Restaurante de cocina cuidada con ingredientes locales y buena reputación.",maps:"Martin Pescador Futaleufú Chile"},
{name:"Sur Andes",type:"bar",trust:"recommended",why:"Restobar flexible para pizza, cerveza y ambiente social después de actividades outdoor.",maps:"Sur Andes Futaleufú Chile"},
{name:"Laguna Espejo",type:"experience",trust:"recommended",why:"Laguna escénica junto al pueblo, fácil de sumar a una caminata corta.",maps:"Laguna Espejo Futaleufú Chile"}
]},
"Frutillar":{region:"Los Lagos",aliases:["frutillar"],items:[
{name:"Hotel Frutillar",type:"hotel",trust:"recommended",why:"Hotel pequeño y tradicional en Frutillar Bajo, cerca del lago.",maps:"Hotel Frutillar Chile"},
{name:"Club Alemán de Frutillar",type:"restaurant",trust:"recommended",why:"Restaurante frente al lago enfocado en tradición chileno-alemana.",maps:"Club Alemán de Frutillar Chile"},
{name:"Black Burger Bar",type:"bar",trust:"recommended",why:"Hamburguesería y bar moderno con coctelería y ambiente casual.",maps:"Black Burger Bar Frutillar Chile"},
{name:"Muelle de Frutillar",type:"experience",trust:"recommended",why:"Paseo gratuito y emblemático del borde del lago Llanquihue.",maps:"Muelle de Frutillar Chile"}
]},
"Puerto Octay":{region:"Los Lagos",aliases:["puerto octay"],items:[
{name:"Hostal Triwe",type:"hotel",trust:"sernatur-listed",why:"Alojamiento incluido actualmente en resultados de SERNATUR para Puerto Octay.",source:"https://serviciosturisticos.sernatur.cl/nueva_busqueda.php?clase_servicio=0&comuna=1032&nombre=&page=1&region=10&tipo_servicio=1"},
{name:"El Fogón de Anita",type:"restaurant",trust:"recommended",why:"Restaurante familiar de ruta conocido por parrilladas, asados y cocina casera.",maps:"El Fogón de Anita Puerto Octay Chile"},
{name:"Nuevo Horizonte",type:"cafe",trust:"recommended",why:"Cafetería conocida por onces, repostería y ambiente tranquilo.",maps:"Nuevo Horizonte Puerto Octay Chile"},
{name:"Costanera de Puerto Octay",type:"experience",trust:"recommended",why:"Paseo lacustre con vistas y arquitectura patrimonial del pueblo.",maps:"Costanera Puerto Octay Chile"}
]},
"Panguipulli":{region:"Los Ríos",aliases:["panguipulli"],items:[
{name:"Hotel 381 Panguipulli",type:"hotel",trust:"recommended",why:"Hotel boutique céntrico con diseño cálido y buena reputación.",maps:"Hotel 381 Panguipulli Chile"},
{name:"Patagonia Natural",type:"restaurant",trust:"recommended",why:"Restaurante conocido por empanadas grandes, jugos y opciones vegetarianas.",maps:"Patagonia Natural Panguipulli Chile"},
{name:"Saona Restobar",type:"bar",trust:"recommended",why:"Restobar céntrico con coctelería y cerveza artesanal.",maps:"Saona Restobar Panguipulli Chile"},
{name:"Lago Panguipulli",type:"experience",trust:"recommended",why:"Principal paisaje lacustre de la ciudad y punto de actividades de verano.",maps:"Lago Panguipulli Chile"}
]},
"Puerto Aysén":{region:"Aysén",aliases:["puerto aysen","puerto aysén","aysen","aysén"],items:[
{name:"Apart Hotel Queitao Patagonia",type:"hotel",trust:"sernatur",why:"Apart hotel con registro vigente e inspección cumplida en SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/2444-apart-hotel-queitao-patagonia"},
{name:"Patagonia Green",type:"hotel",trust:"recommended",why:"Alojamiento de entorno natural muy bien valorado y con oferta de excursiones.",maps:"Patagonia Green Puerto Aysén Chile"},
{name:"Hotel Loberías del Sur",type:"hotel",trust:"sernatur",why:"Hotel con registro vigente en SERNATUR en Puerto Chacabuco, cercano a Puerto Aysén.",source:"https://serviciosturisticos.sernatur.cl/6239-hotel-loberias-del-sur"}
]},
"Hanga Roa":{region:"Valparaíso",aliases:["hanga roa","rapa nui","isla de pascua"],items:[
{name:"Explora Rapa Nui",type:"hotel",trust:"sernatur-listed",why:"Hotel incluido actualmente en el buscador SERNATUR para Hanga Roa.",source:"https://serviciosturisticos.sernatur.cl/8395-explora-rapa-nui"},
{name:"Hotel Taha Tai",type:"hotel",trust:"sernatur-listed",why:"Hotel incluido actualmente en el registro de servicios turísticos consultable de SERNATUR.",source:"https://serviciosturisticos.sernatur.cl/42-hotel-taha-tai"},
{name:"Makona Restaurant",type:"restaurant",trust:"recommended",why:"Restaurante céntrico conocido por pescados, ceviches y cocina de la isla.",maps:"Makona Restaurant Hanga Roa Chile"},
{name:"Bounty Kai & Bar",type:"bar",trust:"recommended",why:"Bar y grill con terraza y coctelería tiki en Hanga Roa.",maps:"Bounty Kai Bar Hanga Roa Chile"},
{name:"Ahu Tahai",type:"experience",trust:"recommended",why:"Sitio arqueológico costero muy popular para caminar y ver el atardecer.",maps:"Ahu Tahai Hanga Roa Chile"}
]}
});
window.ORI_SERVICES.updated="2026-11-02";
})();