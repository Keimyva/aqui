/* Casa de Aquí · contenido del sitio (textos, productos, colecciones, portafolio)
   Se edita aquí; no hace falta tocar app.js */
/* ======================================================
   TEXTOS ES / EN
   ====================================================== */
const T={
 es:{cats:"Catálogos",catProd:"Catálogo de productos",catCol:"Catálogo de colecciones",port:"Portafolio",go:"ir",more:"ver más",
  aboutT:"Quiénes somos",aboutP:"Casa de Aquí es un estudio de diseño costarricense que colabora con artesanos, artistas y talleres locales para crear tanto objetos como espacios interiores funcionales, armoniosos y atemporales. Su enfoque busca equilibrar la belleza, el confort y la calidad de los materiales autóctonos, potenciando el talento artesanal del país para dar vida a piezas y ambientes auténticos que conectan con la identidad de quienes los habitan.",
  menu:"Abrir menú",backCol:"Colecciones",prev:"Anterior",next:"Siguiente",close:"Cerrar"},
 en:{cats:"Catalogs",catProd:"Product catalog",catCol:"Collections catalog",port:"Portfolio",go:"go",more:"see more",
  aboutT:"About us",aboutP:"Casa de Aquí is a Costa Rican design studio that works with local artisans, artists and workshops to create both objects and interior spaces that are functional, harmonious and timeless. Its approach balances beauty, comfort and the quality of native materials, elevating the country’s craftsmanship to bring authentic pieces and spaces to life that connect with the identity of the people who live in them.",
  menu:"Open menu",backCol:"Collections",prev:"Previous",next:"Next",close:"Close"}
};

/* ======================================================
   CONTENIDO  (aquí se cambian nombres y fotos)
   Cada pieza: [nombre, [foto principal, foto 2, foto 3...]]
   Las fotos son los nombres de archivo en minúscula, sin .jpg
   ====================================================== */
const PRODUCTOS=[
 ["Sofá Alba",["sofa-alba","sofa-alb"]],
 ["Sofá Milo",["sofa-mil","sofa-milo"]],
 ["Sofá Nara",["sofa-nara","sofa-nar"]],
 ["Sofá Nube",["sofa-nub","sofa-nube"]],
 ["Sofá Siena",["sofa-siena","sofa-sien"]],
 ["Butaca Nuba",["butaca-nub","butaca-nuba"]],
 ["Banca Nativa",["banca-nativ","banca-nativa"]],
 ["Banca Nórdica",["banca-nordic","banca-nordica"]],
 ["Ottoman Alma",["ottoman-alma","ottoman-alm","ottoman-al"]],
 ["Ottoman Milo",["ottoman-milo","ottoman-mil"]],
 ["Ottoman Nerea",["ottoman-nerea","ottoman-nere"]],
 ["Ottoman Terra",["ottoman-terr","ottoman-terra"]],
 ["Canasta Néctar",["canasta-necta","canasta-nectar"]],
 ["Canasta Trama",["canasta-trama","canasta-tram"]],
 ["Paraguero Nido",["paraguero-nid","paraguero-nido"]],
 ["Porta papel",["porta-papel","porta-pape"]],
 ["Servillero",["servilleter","servilletero"]],
 ["Toallero",["toallero","toaller"]],
 ["Lazzy Susan",["lazzy-susan","lazzy-susa"]],
 ["Bowl Corteza",["bowl-cortez","bowl-corteza"]],
 ["Collar Cascada",["collar-cascad","collar-cascada"]],
 ["Collar Corteza",["collar-corteza","collar-cortez"]],
 ["Collar Liana",["collar-liana","collar-lian"]],
 ["Cojines 1",["cojines1","cojine1"]],
 ["Cojines 2",["cojine2","cojines2"]],
 ["Cojines 3",["cojine3","cojines3"]],
 ["Cojines 4",["cojines4","cojine4"]],
 ["Cojines 5",["cojines5","cojine5"]],
 ["Cojines 6",["cojines6","cojine6"]],
 ["Cojines 7",["cojines7","cojine7"]]
];
const COLECCIONES=[
 {id:"amanecer",nombre:"Amanecer",portada:"amanecer",piezas:[
   ["Amanecer",["amanecer","amanece"]],["Bench Amanecer",["bench-amanecer","bench-amanece"]]]},
 {id:"arrecife",nombre:"Arrecife",portada:"coffee-tabl",piezas:[
   ["Arrecife",["arrecife","arrecif"]],["Coffee Table Arrecife",["coffee-tabl","coffee-table"]]]},
 {id:"originales",nombre:"Originales",portada:"concha",piezas:[
   ["Concha",["concha","conchal"]],["Coral",["coral","cora"]],["Duna",["duna","dun"]],
   ["Eclipse",["eclipse","eclips"]],["Esmeralda",["esmeralda","esmerald"]],
   ["Espejo Luna",["espejo-luna","espejo-lun"]],["Espejo Pixel",["espejo-pixel","espejo-pixe"]],
   ["Hooks Roca",["hooks-roca","hooks-roc"]],["Ojo de buey",["ojo-de-buey","ojo-de-bue"]],
   ["Serena",["serena","seren"]]]}
];
/* Fotos que rotan en el carrusel de la portada */
const CARRUSEL=["servilleter","cojines5","bowl-cortez","banca-nordica","canasta-necta","sofa-mil","ottoman-milo","collar-liana"];

/* ======================================================
   PORTAFOLIO: 7 secciones (el orden de la lista es el orden en la página)
   Cada sección: id, nombre en español / inglés, color de fondo
   y fotos: [archivo, proporción ancho/alto]. Fotos = nombre de archivo sin .jpg
   ====================================================== */
const PORTAFOLIO=[
 {id:"iluminacion",nombre:{es:"Iluminación",en:"Lighting"},bg:"#e0ddd8",portada:"ilum3",
  fotos:[["ilum1",1.213],["ilum2",1.239],["ilum3",1.174],["ilum4",1.252]]},
 {id:"arte",nombre:{es:"Arte",en:"Art"},bg:"#9ea0a2",portada:"arte2",
  fotos:[["arte1",1.16],["arte2",1.205],["arte3",1.139],["arte4",1.155]]},
 {id:"diseno",nombre:{es:"Diseño",en:"Design"},bg:"#e8e1db",portada:"diseno2",wide:true,
  fotos:[["diseno1",2.261],["diseno2",2.082]]},
 {id:"accesorios",nombre:{es:"Accesorios",en:"Accessories"},bg:"#9c837f",portada:"accesorios4",
  fotos:[["accesorios1",1.262],["accesorios2",1.259],["accesorios3",1.238],["accesorios4",1.259]]},
 {id:"almohadones",nombre:{es:"Almohadones",en:"Cushions"},bg:"#8a8f7a",portada:"almohadones1",tall:true,
  fotos:[["almohadones1",0.621],["almohadones2",0.622]]},
 {id:"madera",nombre:{es:"Madera",en:"Wood"},bg:"#d6d6d4",portada:"madera3",
  fotos:[["madera1",1.249],["madera2",1.239],["madera3",1.25],["madera4",1.249]]},
 {id:"tapiceria",nombre:{es:"Tapicería",en:"Upholstery"},bg:"#798a8f",portada:"tapiceria4",
  fotos:[["tapiceria1",1.209],["tapiceria2",1.214],["tapiceria3",1.271],["tapiceria4",1.229]]}
];
