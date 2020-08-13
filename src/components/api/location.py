from flask import Flask
import sqlite3 as sql 
from flask_restful import Resource, abort, reqparse


class Location(Resource):


    def getLocalityId(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()
        
        # add locality arguments
        parser = reqparse.RequestParser()
        parser.add_argument("city")
        parser.add_argument("state")
        parser.add_argument("locality")


        args = parser.parse_args()

        city = args['city']
        state = args['state']
        locality = args['locality']
        
        query = "SELECT * FROM locality WHERE state=? AND city=? AND locality=?"
        result = cursor.execute(query, (state, city, locality))
        localityId = 0
        for row in result:
            localityId = row[0]

        # if localityId is not found, add new locality
        if localityId == 0:
            print("new locality being inserted")
            query = "INSERT INTO locality(city, state, locality) VALUES (?, ?, ?);"
            cursor.execute(query, (city, state, locality))

            connection.commit()

            query = "SELECT localityId FROM locality WHERE city=? AND state=? AND locality=?;"
            result = cursor.execute(query, (city, state, locality))
            for row in result:
                localityId = row[0]

            # if new locality has not been added
            if localityId == 0:
                abort(404)

        return {"localityId": localityId}
