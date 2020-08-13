from flask import Flask, session
from flask_restful import Resource, reqparse, abort
from requestsUsers import RequestsUsers
import sqlite3 as sql

class RequestsHotels(Resource):

    def get_hotelId(self, localityId, connection, cursor):
        hotelId = []
        # connection = sql.connect("data.db")
        # cursor = connection.cursor()
        query = "select id from hotels where locationId = ?"
        for row in cursor.execute(query, (localityId, )):
            # print("hotels ids are ", row)
            hotelId.append(row[0])

        # connection.close()

        if hotelId == 0:
            abort(500, message='no hotels in given locality!')
      
        return hotelId

    def add_requestsHotels(self, requestId, localityId, connection, cursor):

        # get list of all hotels in the locality
        hotelId_list = []
        hotelId_list = self.get_hotelId(localityId, connection, cursor)

        print(hotelId_list)

        for h_id in range(0,len(hotelId_list)):
            query = "INSERT INTO requestsHotels(requestId, hotelId) VALUES (?, ?)"
            # print("ids are:- ", str(requestId) + ", " + str(hotelId_list[h_id]))
            cursor.execute(query, (requestId, hotelId_list[h_id]))
        return "", 200

    def put(self):

        parser = reqparse.RequestParser()

        parser.add_argument("requestId")

        parser.add_argument("hotelId")

        parser.add_argument("bidprice")

        args = parser.parse_args()

        connection = sql.connect('data.db')

        cursor = connection.cursor()

 

        query = 'UPDATE requestsHotels SET bidprice=? WHERE requestId=? AND hotelId=?'

        cursor.execute(query, (args['bidprice'], args['requestId'], args['hotelId']))

 

        connection.commit()

        connection.close()

 

        return "", 200
        

    def get(self):
        connection = sql.connect("data.db")
        cursor = connection.cursor()
        
        query = 'SELECT * FROM requestsHotels'
        result = cursor.execute(query)
        request_hotels_list = []    # list that stores all requests that hotels receive
        for row in result:
            request_hotels_list.append({ "requestId": row[0], "hotelId": row[1], "bidprice": row[2]})

        connection.close()
        return request_hotels_list, 200

    def delete(self):
        parser = reqparse.RequestParser()

        parser.add_argument("requestId")

        parser.add_argument("hotelId")
        args = parser.parse_args()
        connection = sql.connect("data.db")
        cursor = connection.cursor()

        query = 'DELETE FROM requestsHotels WHERE requestId=? and hotelId=?'
        cursor.execute(query, (args['requestId'], args['hotelId']))
        connection.commit()
        connection.close()
        return "deleted", 204
    
    def post(self):

        connection = sql.connect('data.db')
        cursor = connection.cursor()

        parser = reqparse.RequestParser()
        parser.add_argument("requestId")
        parser.add_argument("localityId")
        parser.add_argument("bidprice")
        args = parser.parse_args()
        
        self.add_requestsHotels(args['requestId'], args['localityId'], connection, cursor)
        connection.commit()
        hotelId = 0
        query = "select hotelId from requestsHotels where requestId = ? and hotelId in (select id from hotels where locationId = ?)"
        result = cursor.execute(query, (args['requestId'], args['localityId']))
        for row in result:
            hotelId = row[0]
        self.setBidprice(args['requestId'], hotelId, args['bidprice'])


        return "", 200
