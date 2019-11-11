inputFilePath = "./alumnoClases.csv";
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const config = require("./config/database");
const Alumno = require("./config/alumno");

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

// Connect to the database and log out if it was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to the database " + config.database);
});

// Logout if the connect was failed
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", function(data) {
    try {
      let newAlumno = new Alumno({
        permiso: 0,
        matricula: data["matricula"],
        curp: data["curp"],
        nombre: data["nombre"],
        paterno: data["paterno"],
        materno: data["materno"],
        nivel: data["nivel"],
        grado: data["grado"],
        grupo: data["grupo"],
        fechaNacimiento: data["fechaNacimiento"],
        email: data["email"],
        password: data["password"]
      });

      let matricula = data["matricula"];

      Alumno.getAlumnoByMatricula(matricula, (err, alumno) => {
        if (err) throw err;
        if (alumno) {
          console.log('Ya existe un alumno con esa matricula');
        } else {
          Alumno.addAlumno(newAlumno, (err, alumno) => {
            if (err) {
              console.log('No se pudo registrar al alumno');
            } else {
              console.log('El alumno con matricula: '+ newAlumno.matricula + ' ha sido registrado');
            }
          });
        }
      });
    } catch (err) {
      //error handler
    }
  })
  .on("end", function() {
  });
