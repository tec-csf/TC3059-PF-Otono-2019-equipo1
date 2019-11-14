# coding=utf-8
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
import json
from models import sessions
from datetime import datetime
from models import students, subjects, teachers
from bson import ObjectId
from bson.json_util import dumps


app = FlaskAPI(__name__)

# Class to encode Mongo Objects
class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return obj



@app.route('/active_sessions', methods=['GET'])
def active_sessions():
    redis = sessions.Sessions()
    dbsize = redis.get_active_sessions()

    return jsonify({"Sesiones activas: ": dbsize})


@app.route("/", methods=['GET', 'POST'])
def list():
    return ''

@app.route("/api/v1/students", methods=['GET'])
def fetch_students():
    if request.method == 'GET':
        try:
            students_list = students.Students().find()
            # Return all the records as query string parameters are not available
            if students_list.count > 0:
                # Prepare response if the users are found
                return {'students': dumps(students_list, cls=Encoder)}
            else:
                # Return empty array if no users are found
                return jsonify([])
        except:
            return '', 500
    return ''

@app.route("/api/v1/student/<_id>", methods=['GET'])
def fetch_student(_id):
    if request.method == 'GET':
        try:
            student = students.Students().findOne(_id)
            return {'student': dumps(student, cls=Encoder)}
        except:
            return '', 500
    return ''

@app.route("/api/v1/subjects", methods=['GET'])
def fetch_subjects():
    if request.method == 'GET':
        try:
            subjects_list = subjects.Subjects().find()
            # Return all the records as query string parameters are not available
            if subjects_list.count > 0:
                # Prepare response if the users are found
                return {'subjects': dumps(subjects_list, cls=Encoder)}
            else:
                # Return empty array if no users are found
                return jsonify([])
        except:
            return '', 500
    return ''

@app.route("/api/v1/subject/<_id>", methods=['GET'])
def fetch_subject(_id):
    if request.method == 'GET':
        try:
            subject = subjects.Subjects().findOne(_id)
            return {'subject': dumps(subject, cls=Encoder)}
        except:
            return '', 500
    return ''


@app.route("/api/v1/teachers", methods=['GET'])
def fetch_teachers():
    if request.method == 'GET':
        try:
            teachers_list = teachers.Teachers().find()
            # Return all the records as query string parameters are not available
            if teachers_list.count > 0:
                # Prepare response if the users are found
                return {'teachers': dumps(teachers_list, cls=Encoder)}
            else:
                # Return empty array if no users are found
                return jsonify([])
        except:
            return '', 500
    return ''

@app.route("/api/v1/teacher/<_id>", methods=['GET'])
def fetch_teacher(_id):
    if request.method == 'GET':
        try:
            teacher = teachers.Teachers().findOne(_id)
            return {'teacher': dumps(teacher, cls=Encoder)}
        except:
            return '', 500
    return ''

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
