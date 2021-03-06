inputFilePath = "./alumnos.csv";
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const config = require("./config/database");
const Alumno = require("./models/alumno");

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to the database and log out if it was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to the database " + config.database);
});

// Logout if the connect was failed
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

let dataRecived = [{ type: "alumnos" }];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", function(data) {
    try {
      dataRecived.push(data);
    } catch (err) {
      //error handler
    }
  })
  .on("end", function() {
    reciveData(dataRecived);
  });

function reciveData(data) {
  if (data[0].type === "alumnos") {
    console.log("The poblation will be for the students");
    poblateAlumnos(data.slice(1));
  } else {
    console.log("The poblation will be for the professors");
    poblateProfessors(data.slice(1));
  }
}

function poblateAlumnos(alumnos) {
  console.log(alumnos)
  alumnos.forEach(alumno => {
    let newAlumno = new Alumno({
      permiso: 0,
      matricula: alumno["matricula"],
      curp: alumno["curp"],
      nombre: alumno["nombre"],
      paterno: alumno["paterno"],
      materno: alumno["materno"],
      nivel: alumno["nivel"],
      grado: alumno["grado"],
      grupo: alumno["grupo"],
      fechaNacimiento: alumno["fechaNacimiento"],
      email: alumno["email"],
      password: alumno["password"]
    });

    let matricula = alumno["matricula"];

    Alumno.getAlumnoByMatricula(matricula, (err, alumno) => {
      if (err) throw err;
      if (alumno) {
        console.log("Ya existe un alumno con la matricula: " + matricula);
      } else {
        Alumno.addAlumno(newAlumno, (err, alumno) => {
          if (err) {
            console.log("No se pudo registrar al alumno");
          } else {
            console.log(
              "El alumno con matricula: " +
                newAlumno.matricula +
                " ha sido registrado"
            );
          }
        });
      }
    });
  });
}

[
  {
    "matricula": "A00001",
    "curp": "GORJ38920",
    "nombre": "Juan",
    "paterno": "Gonzalez",
    "materno": "Hernández",
    "nivel": "Secundaria",
    "grado": "1",
    "grupo": "A",
    "fechaNacimiento": "1996-07-20",
    "email": "a@hotmail.com",
    "password": "12345"
  },
  {
    "matricula": "A00002",
    "curp": "GORJ38921",
    "nombre": "Alberto",
    "paterno": "Perez",
    "materno": "Torres",
    "nivel": "Secundaria",
    "grado": "1",
    "grupo": "A",
    "fechaNacimiento": "1996-07-21",
    "email": "a@hotmail.com",
    "password": "12345"
  },
  {
    "matricula": "A00003",
    "curp": "GORJ38922",
    "nombre": "Enrique",
    "paterno": "Gutierrez",
    "materno": "Hernández",
    "nivel": "Secundaria",
    "grado": "1",
    "grupo": "A",
    "fechaNacimiento": "1996-07-22",
    "email": "a@hotmail.com",
    "password": "12345"
  },
  {
    "matricula": "A00004",
    "curp": "GORJ38923",
    "nombre": "Ana",
    "paterno": "Garcia",
    "materno": "Rios",
    "nivel": "Secundaria",
    "grado": "1",
    "grupo": "A",
    "fechaNacimiento": "1996-07-23",
    "email": "a@hotmail.com",
    "password": "12345"
  }
]