const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlumnoSchema = mongoose.Schema({
  permiso: {
    type: Number,
    required: true
  },
  matricula: {
    type: String,
    required: true
  },
  curp: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  paterno: {
    type: String,
    required: true
  },
  materno: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: true
  },
  grado: {
    type: String,
    required: true
  },
  grupo: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  materias: [
    {
      nombreMateria: {
        type: String
      },
      profesor: {
        type: String
      },
      calificaciones: [Number]
    }
  ],
  comentarios: [
    {
      profesor: {
        type: String
      },
      materia: {
        type: String
      },
      fecha: {
        type: String
      },
      titulo: {
        type: String
      },
      texto: {
        type: String
      }
    }
  ]
});

// Create alumno / Use this from outside / Send it to the mongoDB
var Alumno = module.exports = mongoose.model('Alumno', AlumnoSchema);

module.exports.getAlumnoById = function(id, callback) {
  Alumno.findById(id, callback);
};

// Make the query and bring one alumno by the matricula from the DB
module.exports.getAlumnoByMatricula = function(matricula, callback) {
  const query = {
    matricula: matricula
  };
  Alumno.findOne(query, callback);
};

module.exports.addAlumno = function(newAlumno, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAlumno.password, salt, (err, hash) => {
      if (err) throw err;
      newAlumno.password = hash;
      newAlumno.save(callback);
    });
  });
};

