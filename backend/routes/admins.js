const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Admin = require('../models/admin');
const Alumno = require('../models/alumno');

// REDIS NEEDS
// const redis = require('redis');
// const configRedis = require('../config/databaseRedis')

// *** LOCAL ***
// let redisClient = redis.createClient();

// var redisClient = redis.createClient(configRedis.port, configRedis.host, {
//   no_ready_check: true
// });
// redisClient.auth(configRedis.password, function(err) {
//   if (err) throw err;
// });
//
// redisClient.on('connect', function() {
//   console.log('Connected to redis for the Admin');
// });

// ROUTE TO SEARCH USER IN REDIS
// router.post('/searchAdmin', (req, res, next) => {
//   let username = req.body.username;
//
//   redisClient.hgetall(username, function(err, obj) {
//     if (!obj) {
//       return res.json({
//         success: false,
//         msg: 'No existe admin con ese username'
//       });
//     } else {
//       return res.json({
//         success: true,
//         admin: obj
//       });
//     }
//   });
// });

// *** ROUTE TO CREATE USER IN REDIS ***
//
// router.post('/createAdmin', (req, res, next) => {
//   let username = req.body.username;
//   let password = req.body.password;
//
//   redisClient.hset(username, "password", password, function(err, admin) {
//     if (!username) {
//       return res.json({
//         success: false,
//         msg: 'No se creo el admin en redis'
//       });
//     } else {
//       return res.json({
//         success: true,
//         msg: 'Se creo el admin exitosamente en redis'
//       });
//     }
//   });
// });

router.post('/register', (req, res, next) => {
  let newAdmin = new Admin({
    username: req.body.username,
    password: req.body.password
  });

  const username = req.body.username;

  Admin.getAdminByUsername(username, (err, user) => {
    if (user) {
      res.json({
        success: false,
        msg: 'Ya existe un administrador con ese username'
      });
    } else {
      // redisClient.hset(newAdmin.username, "password", newAdmin.password, function(err, admin) {
      //   if (!admin) {
      //     console.log('No se creo el admin en redis');
      //   } else {
      //     console.log('Se creo el admin exitosamente en redis');
      //   }
      // });
      Admin.addAdmin(newAdmin, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: 'No se ha podido crear el administrador'
          });
        } else {
          res.json({
            success: true,
            msg: 'El administrador se creo exitosamente'
          });
        }
      });
    }
  });
});

router.post('/editPassword', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let newPassword = req.body.newPassword;

  Admin.getAdminByUsername(username, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      return res.json({
        success: false,
        msg: 'No se encontro un administrador con ese nombre de usuario'
      });
    }
    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        Admin.editPassword(username, newPassword, (err, editado) => {
          if (err) throw err;
          if (!editado) {
            return res.json({
              success: false,
              msg: 'No se pudo editar la contraseña del administrador'
            });
          } else {
            // redisClient.hset(username, "password", newPassword, function(err, admin) {
            //   if (err) {
            //     console.log('No se pudo editar la contraseña en redis');
            //   } else {
            //     console.log('Se edito la contraseña exitosamente en redis');
            //   }
            // });
            return res.json({
              success: true,
              msg: 'Se ha editado la contraseña correctamente'
            });
          }
        })
      } else {
        return res.json({
          success: false,
          msg: 'Contraseña incorrecta'
        });
      }
    });
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.getAdminByUsername(username, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      return res.json({
        success: false,
        msg: 'No se encontro un administrador con ese nombre de usuario'
      });
    }

    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          admin: {
            id: admin._id,
            username: admin.username,
            comentarios: admin.comentarios
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Contraseña incorrecta'
        });
      }
    });
  });
});

// Profile, access to the data using the token that we generated and check if it still valid
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    admin: req.user
  });
});

router.post('/delete', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.getAdminByUsername(username, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      return res.json({
        success: false,
        msg: 'No se encontro un administrador con ese nombre de usuario'
      });
    }

    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        Admin.deleteAdmin(username, (err, borrado) => {
          if (err) throw err;
          if (!borrado) {
            return res.json({
              success: false,
              msg: 'No se pudo eliminar el administrador'
            });
          } else {
            redisClient.hdel(username, "password", function(err, admin) {
              if (err) {
                console.log('No se pudo eliminar el admin en redis');
              } else {
                console.log('Se borro el admin exitosamente en redis');
              }
            });
            return res.json({
              success: true,
              msg: 'Administrador eliminado'
            });
          }
        })
      } else {
        return res.json({
          success: false,
          msg: 'Contraseña incorrecta'
        });
      }
    });
  });
});

router.post('/getAdmins', (req, res, next) => {
  Admin.getAllAdmins((err, admins) => {
    if (err) throw err;
    if (!admins) {
      return res.json({
        success: false,
        msg: 'No hay administradores'
      });
    } else {
      return res.json({
        success: true,
        admins
      });
    }
  });
});

router.post('/addComentario', (req, res, next) => {
  let matricula = req.body.matricula;
  let profesor = req.body.profesor;
  let materia = req.body.materia;
  let titulo = req.body.titulo;
  let texto = req.body.texto;

  Alumno.comentarioExist(matricula, titulo, (err, comentario) => {
    if (err) throw err;
    if (!comentario) {
      Admin.comentarioExist(matricula, titulo, (err, comentario) => {
        if (err) throw err;
        if (!comentario) {
          Admin.addComentario(matricula, profesor, materia, titulo, texto, (err, comentario) => {
            if (err) {
              res.json({
                success: false,
                msg: 'No se pudo agregar el comentario al alumno'
              });
            } else {
              res.json({
                success: true,
                msg: 'El comentario se ha mandado a revisar exitosamente'
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: 'El comentario para este alumno con este titulo ya esta en revision'
          });
        }
      });
    } else {
      res.json({
        success: false,
        msg: 'El comentario con ese titulo ya existe en el alumno'
      });
    }
  });
});


router.post('/editComentario', (req, res, next) => {
  let matricula = req.body.matricula;
  let titulo = req.body.titulo;
  let texto = req.body.texto;

  Admin.comentarioExist(matricula, titulo, (err, comentario) => {
    if (err) throw err;
    if (comentario) {
      Admin.editComentario(matricula, titulo, texto, (err, comentario) => {
        if (err) {
          res.json({
            success: false,
            msg: 'No se pudo editar el comentario'
          });
        } else {
          res.json({
            success: true,
            msg: 'El comentario se ha editado exitosamente'
          });
        }
      });
    } else {
      res.json({
        success: false,
        msg: 'El comentario no existe para modificar'
      });
    }
  });
});


router.post('/deleteComentario', (req, res, next) => {
  let matricula = req.body.matricula;
  let titulo = req.body.titulo;

  Admin.comentarioExist(matricula, titulo, (err, comentario) => {
    if (err) throw err;
    if (!comentario) {
      res.json({
        success: false,
        msg: 'El comentario no existe'
      });
    } else {
      Admin.deleteComentario(matricula, titulo, (err, comentario) => {
        if (err) {
          res.json({
            success: false,
            msg: 'No se pudo eliminar comentario'
          });
        } else {
          res.json({
            success: true,
            msg: 'El comentario se ha eliminado'
          });
        }
      });
    }
  });
});

// Router module for make the petitions
module.exports = router;
