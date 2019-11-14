import { Injectable } from '@angular/core';
// Bring http module and headers package
import { Http, Headers } from '@angular/http';
// Bring map operation cause we are working with observables
import { map } from 'rxjs/operators';

/* Import the JWT token from angular2-jwt
import { tokenNotExpired } from 'angular2-jwt';*/

// Import the JWT service from @auth0/angular-jwt *Angular v6+ and RxJS v6+*
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;
  permisions: any;
  matriculaVerAlumno: any;
  matriculaVerProfesor: any;

  route: String = 'http://192.168.39.33:30538';

  grupoAlumnos: Object = {
    nivel: String,
    grado: String,
    grupo: String,
    nombreMateria: String,
    profesor: String
  };

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService
  ) { }

  /************ ALUMNO ************/

  registerAlumno(alumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/register', alumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateAlumno(alumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/authenticate', alumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  alumnoLoggedIn() {
    if (localStorage.getItem('permisions') === '0')
      return !this.jwtHelper.isTokenExpired();
  }

  buscarAlumnoMatricula(matriculaAlumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/getAlumno', matriculaAlumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  buscarAlumnosNombre(nombreAlumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/getAlumnosNombre', nombreAlumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  buscarAlumnosGrupo(grupo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/getAlumnosClase', grupo, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editarGrupo(grupo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/updateGrupo', grupo, { headers: headers })
      .pipe(map(res => res.json()));
  }

  buscarAlumnosGrupoRaw(grupo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/getAlumnosGrupo', grupo, { headers: headers })
      .pipe(map(res => res.json()));
  }

  eliminarAlumno(alumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/delete', alumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editarPasswordAlumno(alumno) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/editPassword', alumno, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getProfileAlumno() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.route + '/alumnos/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }

  agregarComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/addComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editarComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/editComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  agregarMateria(materia) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/addMateria', materia, { headers: headers })
      .pipe(map(res => res.json()));
  }

  cambiarCalificaciones(calificaciones) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/updateCalificaciones', calificaciones, { headers: headers })
      .pipe(map(res => res.json()));
  }

  eliminarMateria(materia) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/deleteMateria', materia, { headers: headers })
      .pipe(map(res => res.json()));
  }

  eliminarComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/alumnos/deleteComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  setMatriculaAlumno(matricula) {
    this.matriculaVerAlumno = matricula;
  }

  getMatriculaAlumno() {
    return this.matriculaVerAlumno;
  }

  setGrupo(grupo) {
    this.grupoAlumnos = grupo;
  }

  getGrupo() {
    return this.grupoAlumnos;
  }

  /************ PROFESOR ************/

  registerProfesor(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/register', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateProfesor(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/authenticate', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  profesorLoggedIn() {
    if (localStorage.getItem('permisions') === '1')
      return !this.jwtHelper.isTokenExpired();
  }

  editarPasswordProfesor(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/editPassword', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  buscarProfesorMatricula(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/getProfesor', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  buscarProfesoresNombre(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/getProfesoresNombre', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getAllProfesores() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/getAllProfesores', { headers: headers })
      .pipe(map(res => res.json()));
  }

  getProfesoresGrupo(grupo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/getProfesoresNombreByGroup', grupo, { headers: headers })
      .pipe(map(res => res.json()));
  }

  eliminarProfesor(profesor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/delete', profesor, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getProfileProfesor() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.route + '/profesores/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }

  addClaseProfesor(clase) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/addClase', clase, { headers: headers })
      .pipe(map(res => res.json()));
  }

  deleteClaseProfesor(clase) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/profesores/deleteClase', clase, { headers: headers })
      .pipe(map(res => res.json()));
  }

  setMatriculaVerProfesor(matricula) {
    this.matriculaVerProfesor = matricula;
  }

  getMatricualVerProfesor() {
    return this.matriculaVerProfesor;
  }

  /************ ADMIN ************/

  registerAdmin(admin) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/register', admin, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateAdmin(admin) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/authenticate', admin, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editarPasswordAdmin(admin) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/editPassword', admin, { headers: headers })
      .pipe(map(res => res.json()));
  }

  adminLoggedIn() {
    if (localStorage.getItem('permisions') === '2')
      return !this.jwtHelper.isTokenExpired();
  }

  getProfileAdmin() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.route + '/admin/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }

  agregarAdminComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/addComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editarAdminComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/editComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  eliminarAdminComentario(comentario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/deleteComentario', comentario, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getAdmins() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/getAdmins', { headers: headers })
      .pipe(map(res => res.json()));
  }

  deleteAdmin(admin) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.route + '/admin/delete', admin, { headers: headers })
      .pipe(map(res => res.json()));
  }

  /************ GENERAL ************/


  storeUserData(token, user, permisions) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('permisions', permisions);
    this.authToken = token;
    this.user = user;
    this.permisions = permisions;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.permisions = null;
    localStorage.clear();
  }
}
