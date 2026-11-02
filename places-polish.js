(()=>{
const wm=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const fixes={
  'san-pedro-atacama':{image:wm('Paisaje cerca de San Pedro de Atacama, Chile, 2016-02-01, DD 129.JPG')},
  'valle-elqui':{image:wm('Valle del Elqui.jpg')},
  'valparaiso':{image:wm('Panoramica Valparaiso.jpg')},
  'la-serena-coquimbo':{image:wm('Av. del Mar, La Serena-Chile.JPG')},
  'cajon-maipo':{image:wm('Embalse el Yeso.jpg')},
  'araucania-lacustre':{image:wm('Lago Villarrica Chile.jpg')},
  'huerquehue':{image:wm('Parque Nacional Huerquehue.jpg')},
  'valdivia':{image:wm('Costanera de Valdivia.JPG')},
  'huilo-huilo':{image:wm('Huilo Huilo Waterfalls.jpg')},
  'cochamo-puelo':{image:wm('Chile - Cochamó climbing 09 - granite cliffs and lush valley (7019785251).jpg')},
  'pumalin':{image:wm('Parque Pumalín.jpg')},
  'queulat':{image:wm('Glaciar Colgante Queulat.JPG')},
  'cerro-castillo':{image:wm('Cerro Castillo, Aysén.JPG')},
  'torres-paine':{image:wm('Torres-del-paine.jpg')},
  'punta-arenas':{image:wm('Punta Arenas panorama.jpg')},
  'tierra-fuego':{image:wm('Tierra del Fuego, Chile.JPG')},
  'juan-fernandez':{image:wm('CL-robinson-crusoe-island.jpg')},
  'tumbes-chome':{image:wm('Caleta Tumbes.jpg')},
  'alto-biobio':{image:wm('La belleza de Alto BioBio.jpg')},
  'ruta-termal-sur':{image:wm('Termas Geometricas.jpg')},
  'carretera-austral':{bestSeason:'De octubre a abril suele haber mejores condiciones para un roadtrip completo; en invierno algunos tramos y servicios se reducen.',access:'La Ruta 7 parte en Puerto Montt y continúa hacia Aysén combinando carretera y barcazas. Conviene reservar cruces y revisar combustible por tramo.',difficulty:'Baja para conducción habitual, pero media en tramos largos de ripio, clima cambiante y sectores remotos.'},
  'ruta-lagos-volcanes':{bestSeason:'Verano para lagos y senderos; otoño para colores y termas; invierno para nieve; primavera para rutas escénicas con menor flujo.',access:'Se recorre por tramos entre La Araucanía, Los Ríos y Los Lagos. Lo ideal es elegir uno o dos circuitos por viaje.',difficulty:'Baja a media según el circuito y las actividades que se incorporen.'},
  'chiloe':{bestSeason:'Todo el año. Verano favorece navegación y caminos rurales; otoño e invierno muestran una faceta más lluviosa y auténtica del archipiélago.',access:'La vía principal es el ferry desde Pargua a Chacao; también existen conexiones aéreas hacia Castro y Puerto Montt.',difficulty:'Baja para recorrer ciudades y pueblos; media en senderos costeros o sectores rurales.'},
  'pichilemu':{bestSeason:'Todo el año para surf; primavera y verano para playa y paseos costeros, con mayor afluencia.',access:'Conexión terrestre desde Santiago, Rancagua y Santa Cruz. Punta de Lobos se encuentra a pocos kilómetros al sur de Pichilemu.',difficulty:'Baja para recorrer el destino; el surf depende de experiencia y condiciones del mar.'},
  'pan-azucar':{bestSeason:'Primavera es especialmente atractiva por temperaturas moderadas y posibles floraciones; verano requiere mayor cuidado con el calor.',access:'Se accede por carretera desde Chañaral o Caldera. Lleva agua y revisa previamente caminos, horarios y sectores habilitados.',difficulty:'Baja a media según sendero; el clima desértico aumenta la exigencia.'},
  'conguillio':{bestSeason:'Primavera a otoño para senderismo. En invierno la nieve puede modificar accesos y requerir equipamiento especial.',access:'Los accesos más utilizados son por Melipeuco y Curacautín. Revisa estado de caminos y reservas del parque antes de salir.',difficulty:'Media; algunos miradores y senderos tienen desnivel importante.'},
  'alerce-costero':{bestSeason:'Primavera y verano ofrecen mejores condiciones de senderismo; la lluvia puede presentarse en cualquier época.',access:'Los accesos dependen del sector elegido entre Corral y La Unión. Conviene confirmar ruta y estado de caminos con CONAF.',difficulty:'Media por barro, humedad y desniveles en algunos senderos.'},
  'nahuelbuta':{bestSeason:'Primavera a comienzos de otoño. En invierno pueden existir restricciones por nieve, barro o caminos de montaña.',access:'Los accesos principales se realizan desde Angol y sectores de la provincia de Arauco. Revisa condiciones antes de subir.',difficulty:'Media; Piedra del Águila y otros senderos incluyen pendientes y terreno de montaña.'},
  'futaleufu':{bestSeason:'Primavera y verano concentran la temporada de rafting y kayak; otoño es excelente para senderismo y fotografía.',access:'Se llega por carretera desde Chaitén o vía Argentina. Los traslados requieren planificación por las distancias patagónicas.',difficulty:'Media a alta en actividades de río; baja a media para miradores y senderos.'},
  'nevados-chillan':{bestSeason:'Invierno para ski y snowboard; primavera y verano para trekking, bike park y termas.',access:'Desde Chillán se continúa hacia Pinto, Las Trancas y los centros de montaña. En invierno revisa cadenas y estado de la ruta.',difficulty:'Variable: baja para termas y miradores, media a alta para deportes de montaña.'},
  'base-torres':{bestSeason:'De octubre a abril se concentran mejores condiciones de trekking, aunque el clima patagónico cambia rápidamente durante todo el año.',access:'La ruta parte desde el sector Las Torres del Parque Nacional Torres del Paine. Reserva acceso y transporte con anticipación.',difficulty:'Alta: jornada extensa, desnivel importante y tramo final sobre roca.'}
};
window.P.forEach(place=>{if(fixes[place.id])Object.assign(place,fixes[place.id]);});
})();