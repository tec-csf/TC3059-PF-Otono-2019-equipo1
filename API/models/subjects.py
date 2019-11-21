from pymongo import MongoClient
from bson import ObjectId
import config

class Subjects(object):

    def __init__(self):
        client = MongoClient('mongodb+srv://admin:admin@proyectofinal-4svv1.mongodb.net/test?retryWrites=true')
        db = client.test
        self.collection = db.materias


    def find(self):
        """
        Obtener todas las notas
        """
        cursor = self.collection.find()

        subjects = []

        for subject in cursor:
            # Se adiciono para poder manejar ObjectID
            subject['_id'] = str(subject['_id']) 
            subjects.append(subject)

        return subjects

    def findOne(self, id):
        """
        Obtener la nota con id
        """
        subject = self.collection.find_one({'_id': ObjectId(id)})

        # Se adiciono para poder manejar ObjectID
        if subject is not None:
            subject['_id'] = str(subject['_id'])

        return subject


    def create(self, subject):
        """
        Insertar una nota nueva
        """
        result = self.collection.insert_one(subject)

        return result

    def delete(self, id):
        """
        Eliminar una nota
        """
        result = self.collection.delete_one({'_id': ObjectId(id)})

        return result

    def update(self, id, subject):
        """
        Actualizar una nota
        """
        result = self.collection.replace_one({'_id': ObjectId(id)}, subject )

        return result
