const express = require("express");
const router = express.Router();
const Alumno = require("../models/alumno");

router.post("/poblate", (req, res, next) => {
  let alumnos = req.body;
  var promeses = []
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

    promeses.push(new Promise((resolve) => {Alumno.getAlumnoByMatricula(matricula, (err, alumno) => {
      if (err) throw err;
      if (alumno) {
        resolve({
          success: false,
          msg: "Ya existe un alumno con esa matricula: " + matricula
        });
      } else {
        Alumno.addAlumno(newAlumno, (err, alumno) => {
          if (err) {
            resolve({
              success: false,
              msg: "No se pudo registrar al alumno con matricula: " + newAlumno.matricula
            });
          } else {
            resolve({
              success: true,
              msg: "Alumno con matricula: " + newAlumno.matricula + " registrado exitosamente"
            });
          }
        });
      }
    })}));
  });
  
  Promise.all(promeses).then(responses => {
    // console.log(responses)
    return res.json(responses);
  })
});

module.exports = router;
