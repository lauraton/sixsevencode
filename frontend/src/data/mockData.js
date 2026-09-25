// Datos de referencia (NO son datos de ejemplo de usuarios ni de retos).
// Listos para ser reemplazados/ampliados por llamadas fetch/axios a la
// futura API Node.js/Express + Sequelize.

export const barrios = [
  "San Antonio",
  "Namqom",
  "Simón Bolívar",
  "Obrero",
  "Guadalupe",
  "República Argentina",
];

export const diseaseInfo = [
  {
    id: "dengue",
    nombre: "Dengue",
    color: "#00b5b8",
    icono: "bi-droplet-half",
    descripcion:
      "Enfermedad viral transmitida por la picadura del mosquito Aedes aegypti, que se cría en agua acumulada.",
    sintomas: [
      "Fiebre alta súbita",
      "Dolor detrás de los ojos",
      "Dolor muscular y articular",
      "Manchas en la piel",
    ],
  },
  {
    id: "zika",
    nombre: "Zika",
    color: "#00b5b8",
    icono: "bi-shield-exclamation",
    descripcion:
      "Transmitido por el mismo mosquito que el dengue, suele ser más leve pero riesgoso en el embarazo.",
    sintomas: [
      "Erupción en la piel",
      "Fiebre leve",
      "Conjuntivitis",
      "Dolor en articulaciones",
    ],
  },
  {
    id: "chikungunya",
    nombre: "Chikungunya",
    color: "#00b5b8",
    icono: "bi-bandaid",
    descripcion:
      "Provoca fuertes dolores articulares que pueden persistir por semanas o meses.",
    sintomas: [
      "Fiebre elevada",
      "Dolor articular intenso",
      "Hinchazón en articulaciones",
      "Dolor de cabeza",
    ],
  },
  {
    id: "malaria",
    nombre: "Malaria",
    color: "#00b5b8",
    icono: "bi-thermometer-half",
    descripcion:
      "Causada por un parásito transmitido por el mosquito Anopheles, requiere atención médica urgente.",
    sintomas: [
      "Escalofríos",
      "Fiebre cíclica",
      "Sudoración intensa",
      "Fatiga extrema",
    ],
  },
];

export const weatherAlert = {
  ubicacion: "Formosa Capital",
  temperatura: 31,
  humedad: 78,
  probabilidadLluvia: 80,
  horaLluvia: "18:00 hs",
  recomendacion:
    "Revisá tu patio: dá vuelta baldes, macetas y neumáticos antes de que llueva.",
  nivelRiesgo: "alto",
};

export const notificationSettingsDefault = {
  alertasClima: true,
  avisosMunicipales: true,
  recordatoriosRetos: false,
  novedadesForo: true,
};

// Catálogo de tareas cívicas disponibles (contenido del municipio, no datos
// de un vecino en particular). El estado de cada tarea para el usuario
// autenticado se calcula en el frontend/backend, nunca viene hardcodeado acá.
export const taskCatalog = [
  {
    id: 1,
    titulo: "Vaciar y tapar recipientes con agua",
    descripcion: "Baldes, tachos, floreros y bebederos de mascotas.",
  },
  {
    id: 2,
    titulo: "Dar vuelta neumáticos en desuso",
    descripcion: "Evitá que acumulen agua de lluvia en el patio.",
  },
  {
    id: 3,
    titulo: "Limpiar canaletas y desagües",
    descripcion: "Sacá hojas y residuos que retengan agua estancada.",
  },
  {
    id: 4,
    titulo: "Colocar mosquiteros en tanques",
    descripcion:
      "Cubrí tanques y aljibes para impedir el ingreso de mosquitos.",
  },
];

export const neighborhoodChallenge = {
  barrio: "San Antonio",
  progreso: 0,
};

// Agenda municipal: contenido publicado por el Municipio, se mantiene como
// semilla inicial y se amplía con lo que el rol Municipio publique desde su panel.
export const municipalEvents = [
  {
    id: 1,
    actividad: "Fumigación",
    barrio: "San Antonio",
    fecha: "2026-09-29",
    franjaHoraria: "08:00 - 12:00 hs",
    recomendaciones:
      "Cerrar ventanas y puertas. Retirar ropa colgada y cubrir recipientes de agua y comida.",
  },
  {
    id: 2,
    actividad: "Descacharreo",
    barrio: "Namqom",
    fecha: "2026-10-02",
    franjaHoraria: "09:00 - 13:00 hs",
    recomendaciones:
      "Sacar a la vereda objetos en desuso que puedan acumular agua (cubiertas, botellas, latas).",
  },
];

export const reportTypes = [
  "Criadero de mosquitos",
  "Agua estancada",
  "Basural a cielo abierto",
  "Otro",
];
