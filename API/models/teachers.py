from pymongo import MongoClient
from bson import ObjectId
import config

class Teachers(object):

    def __init__(self):
        client = MongoClient(config.MONGO_URI)
        db = client.test
        self.collection = db.profesores


    def find(self):
        """
        Obtener todas las notas
        """
        cursor = self.collection.find()

        teachers = []

        for teacher in cursor:
            # Se adiciono para poder manejar ObjectID
            teacher['_id'] = str(teacher['_id']) 
            teachers.append(teacher)

        return teachers

    def findOne(self, id):
        """
        Obtener la nota con id
        """
        teacher = self.collection.find_one({'_id': ObjectId(id)})

        # Se adiciono para poder manejar ObjectID
        if teacher is not None:
            teacher['_id'] = str(teacher['_id'])

        return teacher


    def create(self, teacher):
        """
        Insertar una nota nueva
        """
        result = self.collection.insert_one(teacher)

        return result

    def delete(self, id):
        """
        Eliminar una nota
        """
        result = self.collection.delete_one({'_id': ObjectId(id)})

        return result

    def update(self, id, teacher):
        """
        Actualizar una nota
        """
        result = self.collection.replace_one({'_id': ObjectId(id)}, teacher )

        return result
