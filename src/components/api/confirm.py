from flask_restful import Resource, reqparse, abort 

import sqlite3 as sql 

class Confirm(Resource):
    def get(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        query = 'SELECT * FROM confirms'
        result = cursor.execute(query)
        confirms = []
        for row in result:
            confirms.append({"requestId": row[0], "hotelId": row[1]})

        return {'confirms': confirms}, 200

    def post(self, requestId, hotelId):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        # parser = reqparse.RequestParser()
        # parser.add_argument('hotelId')
        # parser.add_argument('requestid')
        
        # args = parser.parse_args()

        query = 'INSERT INTO confirms VALUES (?, ?)'
        result = cursor.execute(query, (requestId, hotelId))

        connection.commit()
        connection.close()
        return '', 200


    def delete(self, requestId, hotelId):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        # parser = reqparse.RequestParser()
        # parser.add_argument('hotelId')
        # parser.add_argument('requestid')
        
        # args = parser.parse_args()

        query = 'DELETE FROM confirms WHERE requestId=? AND hotelId=?'
        result = cursor.execute(query, (requestId, hotelId))

        connection.commit()
        connection.close()
        return '', 204