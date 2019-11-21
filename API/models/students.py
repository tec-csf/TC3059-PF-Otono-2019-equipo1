from pymongo import MongoClient
from bson import ObjectId
import config

class Students(object):

    def __init__(self):
        client = MongoClient('mongodb+srv://admin:admin@proyectofisvv1.mongodb.net/test?retryWrites=true')
        db = client.test
        self.collection = db.alumnos


    def find(self):
        """
        Obtener todas las notas
        """
        cursor = self.collection.find()

        students = []

        for student in cursor:
            # Se adiciono para poder manejar ObjectID
            student['_id'] = str(student['_id']) 
            students.append(student)

        return students

    def findOne(self, id):
        """
        Obtener la nota con id
        """
        student = self.collection.find_one({'_id': ObjectId(id)})

        # Se adiciono para poder manejar ObjectID
        if student is not None:
            student['_id'] = str(student['_id'])

        return student


    def create(self, student):
        """
        Insertar una nota nueva
        """
        result = self.collection.insert_one(student)

        return result

    def delete(self, id):
        """
        Eliminar una nota
        """
        result = self.collection.delete_one({'_id': ObjectId(id)})

        return result

    def update(self, id, student):
        """
        Actualizar una nota
        """
        result = self.collection.replace_one({'_id': ObjectId(id)}, student )

        return result
