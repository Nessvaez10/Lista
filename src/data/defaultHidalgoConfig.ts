import { AttendanceConfig } from '../types';

export const DEFAULT_HIDALGO_CONFIG: AttendanceConfig = {
  version: "1.0.0",
  ultimaActualizacion: new Date().toISOString(),
  sesion: {
    titulo: "Sesión Plenaria de Presidentes Municipales de Hidalgo",
    subtitulo: "Consejo Estatal de Desarrollo Municipal y Coordinación Hidalguense",
    organoConvocante: "Gobierno del Estado de Hidalgo · Secretaría de Gobierno",
    fecha: new Date().toISOString().split('T')[0],
    horaInicio: "10:00",
    lugar: "Salón Gobernadores, Palacio de Gobierno, Pachuca de Soto, Hgo.",
    presidenteMesa: "Secretario de Gobierno del Estado de Hidalgo",
    secretarioActas: "Secretario Técnico de Coordinación Municipal",
    tipoQuorum: "mayoria_simple",
    incluirRepresentantesEnQuorum: true,
    folioSesion: "SES-HGO-2026/01"
  },
  municipios: [
    {
      id: 1,
      clave: "13001",
      nombre: "Acatlán",
      presidente: "María Guadalupe Flores Rodríguez",
      region: "Valle de Tulancingo",
      cabecera: "Acatlán",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 2,
      clave: "13002",
      nombre: "Acaxochitlán",
      presidente: "Ricardo Perea Gómez",
      region: "Valle de Tulancingo",
      cabecera: "Acaxochitlán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 3,
      clave: "13003",
      nombre: "Actopan",
      presidente: "Imelda Cuéllar Cano",
      region: "Valle del Mezquital",
      cabecera: "Actopan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 4,
      clave: "13004",
      nombre: "Agua Blanca de Iturbide",
      presidente: "Hugo Valderrama Osorio",
      region: "Sierra Otomí-Tepehua",
      cabecera: "Agua Blanca de Iturbide",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 5,
      clave: "13005",
      nombre: "Ajacuba",
      presidente: "Zitlaly Zúñiga Peña",
      region: "Valle del Mezquital",
      cabecera: "Ajacuba",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 6,
      clave: "13006",
      nombre: "Alfajayucan",
      presidente: "Julio Agustín Cruz Tovar",
      region: "Valle del Mezquital",
      cabecera: "Alfajayucan",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 7,
      clave: "13007",
      nombre: "Almoloya",
      presidente: "Adolfo Santander Morales",
      region: "Altiplanicie Pulquera",
      cabecera: "Almoloya",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 8,
      clave: "13008",
      nombre: "Apan",
      presidente: "María Zorayda Robles Barrera",
      region: "Altiplanicie Pulquera",
      cabecera: "Apan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 9,
      clave: "13009",
      nombre: "Atitalaquia",
      presidente: "Claudia Sandoval Ramírez",
      region: "Valle de Tula",
      cabecera: "Atitalaquia",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 10,
      clave: "13010",
      nombre: "Atlapexco",
      presidente: "Juan de Dios Nochebuena Hernández",
      region: "Huasteca Hidalguense",
      cabecera: "Atlapexco",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 11,
      clave: "13011",
      nombre: "Atotonilco de Tula",
      presidente: "Yocelyn Tovar Mendoza",
      region: "Valle de Tula",
      cabecera: "Atotonilco de Tula",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 12,
      clave: "13012",
      nombre: "Atotonilco el Grande",
      presidente: "Elba Leticia Chapa Guerrero",
      region: "Sierra Baja",
      cabecera: "Atotonilco el Grande",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 13,
      clave: "13013",
      nombre: "Calnali",
      presidente: "Corina Jiménez Gómez",
      region: "Sierra Alta",
      cabecera: "Calnali",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 14,
      clave: "13014",
      nombre: "Cardonal",
      presidente: "Lucero Ambrocio Cruz",
      region: "Valle del Mezquital",
      cabecera: "Cardonal",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 15,
      clave: "13015",
      nombre: "Chapantongo",
      presidente: "Eligio Figueroa Chávez",
      region: "Valle del Mezquital",
      cabecera: "Chapantongo",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 16,
      clave: "13016",
      nombre: "Chapulhuacán",
      presidente: "José Félix Carpio Carpio",
      region: "Sierra Gorda",
      cabecera: "Chapulhuacán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 17,
      clave: "13017",
      nombre: "Chilcuautla",
      presidente: "Gabriela Escamilla López",
      region: "Valle del Mezquital",
      cabecera: "Chilcuautla",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 18,
      clave: "13018",
      nombre: "Cuautepec de Hinojosa",
      presidente: "Jorge Hernández Araus",
      region: "Valle de Tulancingo",
      cabecera: "Cuautepec de Hinojosa",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 19,
      clave: "13019",
      nombre: "El Arenal",
      presidente: "Jensen Benjamín Oropeza Pérez",
      region: "Valle del Mezquital",
      cabecera: "El Arenal",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 20,
      clave: "13020",
      nombre: "Eloxochitlán",
      presidente: "Anna Laura Ibarra García",
      region: "Sierra Alta",
      cabecera: "Eloxochitlán",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 21,
      clave: "13021",
      nombre: "Emiliano Zapata",
      presidente: "Nellyda Jacqueline Miranda Villegas",
      region: "Altiplanicie Pulquera",
      cabecera: "Emiliano Zapata",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 22,
      clave: "13022",
      nombre: "Epazoyucan",
      presidente: "Carlos Montaño Rodríguez",
      region: "Comarca Minera",
      cabecera: "Epazoyucan",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 23,
      clave: "13023",
      nombre: "Francisco I. Madero",
      presidente: "Dilcya Marlen Benítez",
      region: "Valle del Mezquital",
      cabecera: "Tepatepec",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 24,
      clave: "13024",
      nombre: "Huasca de Ocampo",
      presidente: "Luis Felipe Lugo Salinas",
      region: "Comarca Minera",
      cabecera: "Huasca de Ocampo",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 25,
      clave: "13025",
      nombre: "Huautla",
      presidente: "Jorge Alberto Hernández Cortés",
      region: "Huasteca Hidalguense",
      cabecera: "Huautla",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 26,
      clave: "13026",
      nombre: "Huazalingo",
      presidente: "Vanessa Mejía Hernández",
      region: "Huasteca Hidalguense",
      cabecera: "Huazalingo",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 27,
      clave: "13027",
      nombre: "Huehuetla",
      presidente: "Ramón Martínez Avilés",
      region: "Sierra Otomí-Tepehua",
      cabecera: "Huehuetla",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 28,
      clave: "13028",
      nombre: "Huejutla de Reyes",
      presidente: "José Alfredo San Román Duval",
      region: "Huasteca Hidalguense",
      cabecera: "Huejutla de Reyes",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 29,
      clave: "13029",
      nombre: "Huichapan",
      presidente: "Yeymi Yadira Solís",
      region: "Valle del Mezquital",
      cabecera: "Huichapan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 30,
      clave: "13030",
      nombre: "Ixmiquilpan",
      presidente: "Emanuel Hernández Pascual",
      region: "Valle del Mezquital",
      cabecera: "Ixmiquilpan",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 31,
      clave: "13031",
      nombre: "Jacala de Ledezma",
      presidente: "Kendra Martínez Sánchez",
      region: "Sierra Gorda",
      cabecera: "Jacala",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 32,
      clave: "13032",
      nombre: "Jaltocán",
      presidente: "Guillermo Amador Lara",
      region: "Huasteca Hidalguense",
      cabecera: "Jaltocán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 33,
      clave: "13033",
      nombre: "Juárez Hidalgo",
      presidente: "Valentín Zapata Pérez",
      region: "Sierra Baja",
      cabecera: "Juárez",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 34,
      clave: "13034",
      nombre: "La Misión",
      presidente: "Ciriaco Rubio Villegas",
      region: "Sierra Gorda",
      cabecera: "La Misión",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 35,
      clave: "13035",
      nombre: "Lolotla",
      presidente: "Jesús Antonio Medellín Mendoza",
      region: "Sierra Alta",
      cabecera: "Lolotla",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 36,
      clave: "13036",
      nombre: "Metepec",
      presidente: "Juan Antonio Franco Casas",
      region: "Valle de Tulancingo",
      cabecera: "Metepec",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 37,
      clave: "13037",
      nombre: "Metztitlán",
      presidente: "Susana Rivera Cano",
      region: "Sierra Baja",
      cabecera: "Metztitlán",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 38,
      clave: "13038",
      nombre: "Mineral de la Reforma",
      presidente: "Eduardo Medécigo Rubio",
      region: "Comarca Minera",
      cabecera: "Pachuquilla",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 39,
      clave: "13039",
      nombre: "Mineral del Chico",
      presidente: "Fernando Baltazar Monzalvo",
      region: "Comarca Minera",
      cabecera: "Mineral del Chico",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 40,
      clave: "13040",
      nombre: "Mineral del Monte",
      presidente: "Edmundo Méndez Tejeda",
      region: "Comarca Minera",
      cabecera: "Mineral del Monte",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 41,
      clave: "13041",
      nombre: "Mixquiahuala de Juárez",
      presidente: "Miguel Ángel Peña Flores",
      region: "Valle del Mezquital",
      cabecera: "Mixquiahuala de Juárez",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 42,
      clave: "13042",
      nombre: "Molango de Escamilla",
      presidente: "David Gabriel Andrade Castillo",
      region: "Sierra Alta",
      cabecera: "Molango",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 43,
      clave: "13043",
      nombre: "Nicolás Flores",
      presidente: "Nicolás González Elizalde",
      region: "Valle del Mezquital",
      cabecera: "Nicolás Flores",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 44,
      clave: "13044",
      nombre: "Nopala de Villagrán",
      presidente: "Diana Moreno Rea",
      region: "Valle del Mezquital",
      cabecera: "Nopala de Villagrán",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 45,
      clave: "13045",
      nombre: "Omitlán de Juárez",
      presidente: "Martha Belem Oliver González",
      region: "Comarca Minera",
      cabecera: "Omitlán de Juárez",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 46,
      clave: "13046",
      nombre: "Pachuca de Soto",
      presidente: "Jorge Reyes Hernández",
      region: "Comarca Minera",
      cabecera: "Pachuca de Soto",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 47,
      clave: "13047",
      nombre: "Pacula",
      presidente: "Cristian Trejo Miranda",
      region: "Sierra Gorda",
      cabecera: "Pacula",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 48,
      clave: "13048",
      nombre: "Pisaflores",
      presidente: "Miguel Bahena Trejo",
      region: "Sierra Gorda",
      cabecera: "Pisaflores",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 49,
      clave: "13049",
      nombre: "Progreso de Obregón",
      presidente: "Lorena Estrada Flores",
      region: "Valle del Mezquital",
      cabecera: "Progreso",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 50,
      clave: "13050",
      nombre: "San Agustín Metzquititlán",
      presidente: "Germán Hernández Pérez",
      region: "Sierra Baja",
      cabecera: "Mezquititlán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 51,
      clave: "13051",
      nombre: "San Agustín Tlaxiaca",
      presidente: "Marco Antonio Olvera Jost",
      region: "Comarca Minera",
      cabecera: "San Agustín Tlaxiaca",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 52,
      clave: "13052",
      nombre: "San Bartolo Tutotepec",
      presidente: "Santos Cabrera Hernández",
      region: "Sierra Otomí-Tepehua",
      cabecera: "San Bartolo Tutotepec",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 53,
      clave: "13053",
      nombre: "San Felipe Orizatlán",
      presidente: "Carlos César Pérez Escamilla",
      region: "Huasteca Hidalguense",
      cabecera: "Orizatlán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 54,
      clave: "13054",
      nombre: "San Salvador",
      presidente: "Norberto Martínez Cruz",
      region: "Valle del Mezquital",
      cabecera: "San Salvador",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 55,
      clave: "13055",
      nombre: "Santiago de Anaya",
      presidente: "Edgar Monter Ángeles",
      region: "Valle del Mezquital",
      cabecera: "Santiago de Anaya",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 56,
      clave: "13056",
      nombre: "Santiago Tulantepec de Lugo Guerrero",
      presidente: "María Yanet Fernández Fernández",
      region: "Valle de Tulancingo",
      cabecera: "Santiago Tulantepec",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 57,
      clave: "13057",
      nombre: "Singuilucan",
      presidente: "Yazmín Dávila López",
      region: "Valle de Tulancingo",
      cabecera: "Singuilucan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 58,
      clave: "13058",
      nombre: "Tasquillo",
      presidente: "Alberto Trejo Sánchez",
      region: "Valle del Mezquital",
      cabecera: "Tasquillo",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 59,
      clave: "13059",
      nombre: "Tecozautla",
      presidente: "Marisol Prieto Avendaño",
      region: "Valle del Mezquital",
      cabecera: "Tecozautla",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 60,
      clave: "13060",
      nombre: "Tenango de Doria",
      presidente: "Martha López Ríos",
      region: "Sierra Otomí-Tepehua",
      cabecera: "Tenango de Doria",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 61,
      clave: "13061",
      nombre: "Tepeapulco",
      presidente: "Alfredo González Quiroz",
      region: "Altiplanicie Pulquera",
      cabecera: "Tepeapulco",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 62,
      clave: "13062",
      nombre: "Tepehuacán de Guerrero",
      presidente: "Francisco Martínez Enríquez",
      region: "Sierra Alta",
      cabecera: "Tepehuacán de Guerrero",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 63,
      clave: "13063",
      nombre: "Tepeji del Río de Ocampo",
      presidente: "Tania Valdés Cuéllar",
      region: "Valle de Tula",
      cabecera: "Tepeji del Río de Ocampo",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 64,
      clave: "13064",
      nombre: "Tepetitlán",
      presidente: "Yissel Rodríguez Castillo",
      region: "Valle de Tula",
      cabecera: "Tepetitlán",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 65,
      clave: "13065",
      nombre: "Tetepango",
      presidente: "Enrique Alfonso Rivera Flores",
      region: "Valle de Tula",
      cabecera: "Tetepango",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 66,
      clave: "13066",
      nombre: "Tezontepec de Aldama",
      presidente: "Ana María Rivera Contreras",
      region: "Valle del Mezquital",
      cabecera: "Tezontepec de Aldama",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 67,
      clave: "13067",
      nombre: "Tianguistengo",
      presidente: "Febronio Rodríguez Villegas",
      region: "Sierra Alta",
      cabecera: "Tianguistengo",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 68,
      clave: "13068",
      nombre: "Tizayuca",
      presidente: "Gretchen Atilano Moreno",
      region: "Cuenca de México",
      cabecera: "Tizayuca",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 69,
      clave: "13069",
      nombre: "Tlahuelilpan",
      presidente: "Norma Leticia Reyes Reyes",
      region: "Valle del Mezquital",
      cabecera: "Tlahuelilpan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 70,
      clave: "13070",
      nombre: "Tlahuiltepa",
      presidente: "Danay Montes Benítez",
      region: "Sierra Baja",
      cabecera: "Tlahuiltepa",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 71,
      clave: "13071",
      nombre: "Tlanalapa",
      presidente: "Saúl Granados Hernández",
      region: "Altiplanicie Pulquera",
      cabecera: "Tlanalapa",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 72,
      clave: "13072",
      nombre: "Tlanchinol",
      presidente: "Gabino Hernández Vite",
      region: "Sierra Alta",
      cabecera: "Tlanchinol",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 73,
      clave: "13073",
      nombre: "Tlaxcoapan",
      presidente: "Teresa Olivares Reyna",
      region: "Valle de Tula",
      cabecera: "Tlaxcoapan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 74,
      clave: "13074",
      nombre: "Tolcayuca",
      presidente: "Armando Zúñiga Gutiérrez",
      region: "Cuenca de México",
      cabecera: "Tolcayuca",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 75,
      clave: "13075",
      nombre: "Tula de Allende",
      presidente: "Cristhian Evanivaldo Martínez Reséndiz",
      region: "Valle de Tula",
      cabecera: "Tula de Allende",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 76,
      clave: "13076",
      nombre: "Tulancingo de Bravo",
      presidente: "Lorena García Cázares",
      region: "Valle de Tulancingo",
      cabecera: "Tulancingo",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 77,
      clave: "13077",
      nombre: "Villa de Tezontepec",
      presidente: "Pompeyo Aguilar Ortiz",
      region: "Cuenca de México",
      cabecera: "Tezontepec",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 78,
      clave: "13078",
      nombre: "Xochiatipan",
      presidente: "María Soledad Fayad",
      region: "Huasteca Hidalguense",
      cabecera: "Xochiatipan",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 79,
      clave: "13079",
      nombre: "Xochicoatlán",
      presidente: "José Juan Viggiano Austria",
      region: "Sierra Alta",
      cabecera: "Xochicoatlán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 80,
      clave: "13080",
      nombre: "Yahualica",
      presidente: "Francisca Lara Velázquez",
      region: "Huasteca Hidalguense",
      cabecera: "Yahualica",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 81,
      clave: "13081",
      nombre: "Zacualtipán de Ángeles",
      presidente: "Amado Pérez Hernández",
      region: "Sierra Alta",
      cabecera: "Zacualtipán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 82,
      clave: "13082",
      nombre: "Zapotlán de Juárez",
      presidente: "Cynthia Arellano Martínez",
      region: "Cuenca de México",
      cabecera: "Zapotlán de Juárez",
      cargo: "Presidenta Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 83,
      clave: "13083",
      nombre: "Zempoala",
      presidente: "Francisco Sinuhé Ramírez Oviedo",
      region: "Altiplanicie Pulquera",
      cabecera: "Zempoala",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    },
    {
      id: 84,
      clave: "13084",
      nombre: "Zimapán",
      presidente: "Hermilo Trejo Rangel",
      region: "Sierra Gorda",
      cabecera: "Zimapán",
      cargo: "Presidente Municipal Constitucional",
      status: "ausente"
    }
  ]
};
