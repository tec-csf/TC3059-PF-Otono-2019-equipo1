const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const Alumno = require("../models/alumno");

router.post("/poblate", (req, res, next) => {
  let alumnos = req.body;
  var response = [];

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
        response.push({
          success: false,
          msg: "Ya existe un alumno con esa matricula: " + matricula
        });
      } else {
        Alumno.addAlumno(newAlumno, (err, alumno) => {
          if (err) {
            response.push({
              success: false,
              msg: "No se pudo registrar al alumno con matricula: " + newAlumno.matricula
            });
          } else {
            response.push({
              success: true,
              msg: "Alumno con matricula: " + newAlumno.matricula + "registrado exitosamente"
            });
          }
        });
      }
      console.log(response);
    });
  });

  console.log(response);
  return res.json(response);
});

module.exports = router;
