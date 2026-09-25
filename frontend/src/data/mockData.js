// Datos simulados (mock). Estructura pensada para ser reemplazada por
// llamadas fetch/axios a la futura API Node.js/Express + Sequelize.

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
    color: "#2fb380",
    icono: "bi-emoji-dizzy",
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
    color: "#f0ad4e",
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
    color: "#8a63d2",
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

export const neighborhoodChallenge = {
  barrio: "San Antonio",
  metaVecinos: 320,
  vecinosParticipando: 217,
  progreso: 68,
};

export const challengeTasks = [
  {
    id: 1,
    titulo: "Vaciar y tapar recipientes con agua",
    descripcion: "Baldes, tachos, floreros y bebederos de mascotas.",
    estado: "aprobado",
    foto: null,
  },
  {
    id: 2,
    titulo: "Dar vuelta neumáticos en desuso",
    descripcion: "Evitá que acumulen agua de lluvia en el patio.",
    estado: "pendiente",
    foto: null,
  },
  {
    id: 3,
    titulo: "Limpiar canaletas y desagües",
    descripcion: "Sacá hojas y residuos que retengan agua estancada.",
    estado: "rechazado",
    foto: null,
    motivoRechazo: "La foto no muestra la canaleta limpia.",
  },
  {
    id: 4,
    titulo: "Colocar mosquiteros en tanques",
    descripcion:
      "Cubrí tanques y aljibes para impedir el ingreso de mosquitos.",
    estado: "sin_enviar",
    foto: null,
  },
];

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
  {
    id: 3,
    actividad: "Fumigación",
    barrio: "Simón Bolívar",
    fecha: "2026-10-05",
    franjaHoraria: "17:00 - 20:00 hs",
    recomendaciones:
      "Mantener a mascotas dentro del hogar durante la fumigación.",
  },
  {
    id: 4,
    actividad: "Descacharreo",
    barrio: "Obrero",
    fecha: "2026-10-08",
    franjaHoraria: "08:30 - 12:30 hs",
    recomendaciones:
      "Separar los residuos reciclables de los objetos que serán retirados por la cuadrilla.",
  },
];

export const forumPosts = [
  {
    id: 1,
    autor: "Marisa G.",
    barrio: "Guadalupe",
    tag: "dengue",
    titulo: "Cómo detectamos el dengue a tiempo en casa",
    historia:
      "Mi hijo tuvo fiebre alta de golpe y dolor detrás de los ojos. Fuimos rápido al centro de salud y el diagnóstico temprano evitó complicaciones.",
    fecha: "2026-09-10",
  },
  {
    id: 2,
    autor: "Roberto D.",
    barrio: "Namqom",
    tag: "chikungunya",
    titulo: "Meses de dolor articular, pero salimos adelante",
    historia:
      "El chikungunya me tuvo varias semanas con dolor en las rodillas. La kinesiología y el reposo fueron claves para la recuperación.",
    fecha: "2026-08-22",
  },
  {
    id: 3,
    autor: "Estela P.",
    barrio: "San Antonio",
    tag: "zika",
    titulo: "Cuidados durante el embarazo",
    historia:
      "Estando embarazada extremé los cuidados: repelente, mosquitero y consultas frecuentes. Todo salió bien gracias a la prevención.",
    fecha: "2026-07-30",
  },
];

export const adminSubmissions = [
  {
    id: 101,
    vecino: "Ana Flores",
    barrio: "San Antonio",
    tarea: "Vaciar y tapar recipientes con agua",
    fecha: "2026-09-23",
    estado: "pendiente",
    fotoDescripcion: "Patio con recipientes vacíos y tapados",
  },
  {
    id: 102,
    vecino: "Julián Torres",
    barrio: "Namqom",
    tarea: "Dar vuelta neumáticos en desuso",
    fecha: "2026-09-23",
    estado: "pendiente",
    fotoDescripcion: "Neumáticos apilados boca abajo",
  },
  {
    id: 103,
    vecino: "Carla Sosa",
    barrio: "Obrero",
    tarea: "Limpiar canaletas y desagües",
    fecha: "2026-09-22",
    estado: "pendiente",
    fotoDescripcion: "Canaleta lateral de la vivienda",
  },
  {
    id: 104,
    vecino: "Pedro Ibáñez",
    barrio: "Guadalupe",
    tarea: "Colocar mosquiteros en tanques",
    fecha: "2026-09-21",
    estado: "pendiente",
    fotoDescripcion: "Tanque de agua con mosquitero instalado",
  },
];
