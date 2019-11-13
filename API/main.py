# coding=utf-8
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
import json
from models import sessions
from datetime import datetime
from models import students
from bson import ObjectId


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
def fetch_users():
    if request.method == 'GET':
        try:
            students_list = students.Students().find()
            # Return all the records as query string parameters are not available
            if students_list.count > 0:
                # Prepare response if the users are found
                return {'students': json.dumps(students_list, cls=Encoder)}
            else:
                # Return empty array if no users are found
                return jsonify([])
        except:
            return '', 500
    return ''



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
