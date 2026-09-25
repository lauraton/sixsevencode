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

// Ficha médica completa por enfermedad, basada en fuente epidemiológica
// provista por el municipio. Estructura fija: qué es, cómo se contagia,
// síntomas, prevención y qué hacer si se padece la enfermedad.
export const diseaseInfo = [
  {
    id: "dengue",
    nombre: "Dengue",
    color: "#00b5b8",
    icono: "bi-droplet-half",
    agenteCausal: "Virus del dengue (familia Flaviviridae, 4 serotipos)",
    vectorPrincipal: "Aedes aegypti",
    sintomaDistintivo:
      'Dolor retroocular y muscular intenso ("fiebre quebrantahuesos")',
    queEs:
      "Enfermedad febril aguda causada por el virus del dengue (familia Flaviviridae). Existen 4 serotipos (DENV-1, DENV-2, DENV-3, DENV-4). La infección por un serotipo da inmunidad de por vida contra ese tipo en específico, pero las infecciones posteriores por otros serotipos aumentan el riesgo de desarrollar dengue grave.",
    contagio: [
      "A través de la picadura de hembras infectadas del mosquito Aedes aegypti (y en menor medida Aedes albopictus). No se transmite directamente de persona a persona.",
    ],
    sintomasIntro: null,
    sintomas: [
      {
        titulo: "Fase febril (3-7 días)",
        items: [
          "Fiebre alta repentina (39-40°C)",
          "Dolor de cabeza intenso",
          "Dolor retroocular (detrás de los ojos)",
          'Dolores musculares y articulares severos ("fiebre quebrantahuesos")',
          "Náuseas y vómitos",
          "Erupción cutánea",
        ],
      },
      {
        titulo: "Signos de alarma (Dengue Grave)",
        items: [
          "Dolor abdominal intenso y continuo",
          "Vómitos persistentes",
          "Sangrado de mucosas (encías, nariz)",
          "Acumulación de líquidos",
          "Letargo o irritabilidad",
        ],
      },
    ],
    prevencion: [
      "Control del vector: descacharrado (eliminar o dar vuelta recipientes que acumulen agua limpia dentro y fuera del hogar).",
      "Protección personal: uso de repelente (con DEET, Icaridina o IR3535), colocación de mosquiteros en puertas y ventanas, ropa de manga larga.",
      "Vacunación: disponibilidad de vacunas (como QDenga) según criterio médico y zona epidemiológica.",
    ],
    queHacer: [
      "Atención médica: consultar inmediatamente a un centro de salud ante el inicio de síntomas.",
      "Reposo e hidratación: reposo absoluto y beber abundantes líquidos (sales de rehidratación oral, agua).",
      "Manejo de la fiebre: usar únicamente paracetamol según indicación médica.",
      "Evitar estrictamente: aspirina, ibuprofeno, diclofenac o naproxeno, ya que inhiben las plaquetas y aumentan el riesgo de hemorragias.",
    ],
  },
  {
    id: "zika",
    nombre: "Zika",
    color: "#00b5b8",
    icono: "bi-shield-exclamation",
    agenteCausal: "Virus del Zika (Flaviviridae)",
    vectorPrincipal: "Aedes aegypti (además de vía sexual y perinatal)",
    sintomaDistintivo: "Conjuntivitis no purulenta (ojos rojos sin secreción)",
    queEs:
      "Enfermedad vírica provocada por el virus del Zika (también un Flavivirus). En la mayoría de los casos es leve o asintomática, pero representa un grave riesgo en mujeres embarazadas por la relación directa con microcefalia y malformaciones congénitas en el feto, además de desencadenar el síndrome de Guillain-Barré.",
    contagio: [
      "Picadura de mosquito: principalmente Aedes aegypti.",
      "Vía sexual: se transmite por contacto sexual sin protección con una persona infectada (el virus permanece en el semen por semanas o meses).",
      "Transmisión perinatal: de madre a hijo durante el embarazo o el parto.",
      "Transfusión sanguínea: riesgo menor pero documentado.",
    ],
    sintomasIntro:
      "Aparecen entre 3 y 14 días tras la picadura y duran de 2 a 7 días. Con frecuencia es asintomático (80% de los casos).",
    sintomas: [
      {
        titulo: null,
        items: [
          "Fiebre moderada o febrícula",
          "Conjuntivitis no purulenta (ojos rojos sin secreción)",
          "Erupción cutánea maculopapular (manchas rojas en la piel) que suele comenzar en la cara y extenderse",
          "Dolores articulares leves o moderados (manos y pies) y dolores musculares",
        ],
      },
    ],
    prevencion: [
      "Control del vector: mismas medidas de control contra el mosquito Aedes aegypti.",
      "Uso de preservativo: especialmente durante el embarazo o si se reside o viaja a zonas con brotes activos de Zika.",
      "Postergación de viajes: mujeres embarazadas deberían evitar zonas endémicas.",
    ],
    queHacer: [
      "Consulta médica para confirmación y seguimiento epidemiológico.",
      "Reposo y consumo abundante de líquidos.",
      "Tratamiento sintomático con paracetamol para la fiebre y el dolor (evitar AINES hasta descartar dengue).",
      "Evitar la picadura de mosquitos durante la primera semana para no continuar el ciclo de transmisión local.",
    ],
  },
  {
    id: "chikungunya",
    nombre: "Chikungunya",
    color: "#00b5b8",
    icono: "bi-bandaid",
    agenteCausal: "Virus Chikungunya (género Alphavirus, familia Togaviridae)",
    vectorPrincipal: "Aedes aegypti y Aedes albopictus",
    sintomaDistintivo:
      "Dolor articular severo e incapacitante, bilateral y simétrico",
    queEs:
      'Enfermedad vírica causada por el virus Chikungunya (género Alphavirus, familia Togaviridae). La palabra significa "aquel que se encorva" en idioma Makonde, en referencia a la postura encorvada que adoptan los enfermos por el dolor articular extremo.',
    contagio: [
      "Transmitida exclusivamente por la picadura de mosquitos Aedes aegypti y Aedes albopictus infectados. No hay transmisión directa de persona a persona.",
    ],
    sintomasIntro: null,
    sintomas: [
      {
        titulo: null,
        items: [
          "Inicio abrupto: fiebre alta súbita",
          "Dolor articular severo e incapacitante: afecta principalmente manos, muñecas, tobillos y pies, de forma bilateral y simétrica",
          "Otros síntomas: erupción cutánea, dolor muscular, dolor de cabeza, náuseas, fatiga",
        ],
      },
      {
        titulo: "Fase crónica",
        items: [
          "En un porcentaje significativo de pacientes, los dolores articulares pueden persistir durante meses o años.",
        ],
      },
    ],
    prevencion: [
      "Eliminación de criaderos de mosquitos en el entorno urbano y doméstico.",
      "Uso sistemático de repelentes, tules o mosquiteros.",
      "Evitar la exposición en las horas de mayor actividad del mosquito (primeras horas de la mañana y atardecer).",
    ],
    queHacer: [
      "Consultar a un médico para el diagnóstico diferencial.",
      "Hidratación adecuada y reposo prolongado.",
      "Manejo sintomático de la fiebre con paracetamol en la fase aguda.",
      "Para la inflamación articular persistente, el médico evaluará analgésicos o antiinflamatorios una vez descartado el riesgo de dengue hemorrágico.",
    ],
  },
  {
    id: "malaria",
    nombre: "Malaria",
    color: "#00b5b8",
    icono: "bi-thermometer-half",
    agenteCausal: "Parásitos del género Plasmodium",
    vectorPrincipal: "Anopheles",
    sintomaDistintivo:
      "Paroxismo palúdico (escalofríos, fiebre y sudoración cíclicos)",
    queEs:
      "A diferencia del Dengue, Zika y Chikungunya (que son causados por virus), la malaria es una enfermedad parasitaria potencialmente mortal causada por protozoos del género Plasmodium (P. falciparum, P. vivax, P. malariae, P. ovale y P. knowlesi). P. falciparum es la especie más letal.",
    contagio: [
      "Picadura de mosquito: transmitida por las hembras del mosquito del género Anopheles, que pican principalmente entre el anochecer y el amanecer.",
      "Vías secundarias: transfusiones de sangre, agujas contaminadas o transmisión congénita de la madre al feto.",
    ],
    sintomasIntro: "Aparecen entre 10 y 15 días después de la picadura.",
    sintomas: [
      {
        titulo: "Paroxismo palúdico",
        items: [
          "Accesos característicos de escalofríos intensos con temblores, seguidos de fiebre alta y, finalmente, sudoración profusa con caída de la temperatura.",
        ],
      },
      {
        titulo: "Síntomas generales",
        items: [
          "Dolor de cabeza",
          "Vómitos",
          "Dolor muscular",
          "Anemia (por destrucción de glóbulos rojos)",
          "Ictericia (coloración amarillenta en piel y ojos)",
        ],
      },
      {
        titulo: "Malaria grave",
        items: [
          "Si no se trata, P. falciparum puede causar insuficiencia renal, convulsiones, coma (malaria cerebral) y la muerte.",
        ],
      },
    ],
    prevencion: [
      "Control del vector: uso de mosquiteros de cama impregnados con insecticida de larga duración (MILD) y fumigación de interiores.",
      "Quimioprofilaxis: medicamentos antipalúdicos tomados antes, durante y después de viajar a regiones endémicas.",
      "Vacunación: aplicación de vacunas antipalúdicas (como RTS,S/AS01 o R21/Matrix-M), dirigidas principalmente a niños en zonas de alta transmisión endémica.",
    ],
    queHacer: [
      "Buscar atención médica urgente: la malaria por P. falciparum es una emergencia médica.",
      "Tratamiento antiparasitario específico: administración inmediata de medicamentos antipalúdicos prescritos por un médico (como terapias combinadas basadas en la artemisinina - TCA). No existen remedios caseros para curar la malaria.",
      "Monitoreo hospitalario: en casos graves se requiere hospitalización e hidratación intravenosa.",
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
