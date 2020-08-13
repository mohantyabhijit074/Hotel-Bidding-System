# FILE CONTAINING API REQUESTS FOR "REQUESTS" PAGE OF THE WEBSITE

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, reqparse, abort

import sqlite3 as sql 

class Request(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("people")
    parser.add_argument("food")
    parser.add_argument('snacks')
    parser.add_argument("rooms")
    parser.add_argument("budget")   # preferred budget
    parser.add_argument("city")
    parser.add_argument("state")
    parser.add_argument("locality")
    parser.add_argument("hall")
    parser.add_argument("date")

    @classmethod
    def get_by_id(cls, requestId):
        connection = sql.connect("data.db")
        cursor = connection.cursor()

    # check if requestID is present
        temp = 0
        query = 'SELECT requestId FROM requests WHERE requestId =?'
        result = cursor.execute(query, (requestId, ))
        for row in result:
            temp = row[0]
        if temp == 0:
            abort(404, message='request not found')

    # get all column details of corresponding requestId
        hall = ""
        hallquery = "SELECT hall FROM requests WHERE requestId=?;"
        result = cursor.execute(hallquery,(requestId,))
        for row in result:
            hall = row[0]
        print("hall = ", hall)

        localityId=-1
        localityquery = "SELECT localityId FROM requests WHERE requestId=?;"
        result = cursor.execute(localityquery,(requestId,))
        for row in result:
            localityId = row[0]

        date = ""
        query = "SELECT date FROM requests WHERE requestId=?;"
        result = cursor.execute(query,(requestId,))
        for row in result:
            date = row[0]

        people = 0
        query = "SELECT people FROM requests WHERE requestId=?;"
        result = cursor.execute(query,(requestId,))
        for row in result:
            people = row[0]

        rooms = 0
        query = "SELECT rooms FROM requests WHERE requestId=?"
        result = cursor.execute(query,(requestId,))
        for row in result:
            rooms = row[0]

        #---------------

        connection.close()

        return {
                "id": requestId,
                "hall": hall,
                "localityId": localityId,
                "date": date,
                "people": people,
                "rooms": rooms 
            }
        

    @classmethod
    def insert(cls, request):
        connection = sql.connect("data.db")
        cursor = connection.cursor()
        query = "INSERT INTO requests VALUES(?,?,?,?,?,?,?,?)"
        cursor.execute(query,(request["hall"], request["localityId"], request["date"], request["people"], request["food"], request["snacks"], request["rooms"], request["budget"]))
        connection.commit()
        connection.close()
        return request, 201

    @classmethod
    def update(cls, request):
        connection = sql.connect("data.db")
        cursor = connection.cursor()
        query = "UPDATE requests SET hall=?, localityId=?, date=?, people=?, food=?, snacks=?, rooms=?, budget=? WHERE requestId=?;"
        cursor.execute(query, (request['hall'], request['localityId'], request['date'], request['people'], request['food'], request['snacks'], request['rooms'], request['budget'], request['id']))
        connection.commit()
        connection.close()
        return request, 201   

    # @classmethod
    # def get_hotelId(cls, localityId, connection, cursor):
    #     hotelId = []
    #     # connection = sql.connect("data.db")
    #     # cursor = connection.cursor()
    #     query = "select id from hotels where locationId = ?"
    #     for row in cursor.execute(query, (localityId, )):
    #         # print("hotels ids are ", row)
    #         hotelId.append(row[0])

    #     # connection.close()

    #     if hotelId == 0:
    #         abort(500, message='error in processing request')
      
    #     return hotelId

    # @classmethod 
    # def update_requestsHotels(cls, requestId, localityId, connection, cursor):

    #     # get list of all hotels in the locality
    #     hotelId_list = []
    #     hotelId_list = Request.get_hotelId(localityId, connection, cursor)

    #     print(hotelId_list)

    #     for h_id in range(0,len(hotelId_list)):
    #         query = "INSERT INTO requestsHotels(requestId, hotelId) VALUES (?, ?)"
    #         # print("ids are:- ", str(requestId) + ", " + str(hotelId_list[h_id]))
    #         cursor.execute(query, (requestId, hotelId_list[h_id]))
            

    #     return "", 200


    def get(self, requestId):
        request = self.get_by_id(requestId)
        if request:
            return request, 200
        abort(404, message="request not found")

    

    def put(self, requestId):
        request = self.get_by_id(requestId)
        args = self.parser.parse_args()  

        new_request = {"id": requestId, "hall": args['hall'], 'localityId': request['localityId'], 'date': args['date'], 'people': args['people'], 'food': args['food'], 'snacks': args['snacks'], 'rooms': args['rooms'], 'budget': args['budget']}
        if request is None:
            self.insert(new_request)
            Request.update_requestsHotels(requestId, request['localityId'])
        else:
            self.update(new_request)

        return new_request, 200


    def delete(self, requestId):
        connection = sql.connect('data.db')
        cursor = connection.cursor()
        query = "DELETE FROM requests WHERE requestId=?;"
        cursor.execute(query, (requestId, ))
        connection.commit()
        connection.close()
        return "", 201


class RequestList(Resource):
    def get(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM requests;"
        result = cursor.execute(query)

        requests = []
        for row in result:
            requests.append({"id": row[0], "hall": row[1], "localityId": row[2], "date": row[3], "people": row[4], "food": row[5], "snacks": row[6], "rooms": row[7], "budget": row[8]})


        connection.close()
        return {"requests":requests}, 200

    def post(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        args = Request.parser.parse_args()

        city = args['city']
        state = args['state']
        locality = args['locality']
        
        query = "SELECT * FROM locality WHERE state=? AND city=? AND locality=?"
        result = cursor.execute(query, (state, city, locality))
        localityId = 0
        # print("now iterating.....")
        for row in result:
            localityId = row[0]
            # print("row = ", type(row))

        # print("old locality id = ", localityId)

        # if localityId is not found, add new locality
        if localityId == 0:
            # change to locality api call here.
            query = "INSERT INTO locality(city, state, locality) VALUES (?, ?, ?);"
            cursor.execute(query, (city, state, locality))

            query = "SELECT localityId FROM locality WHERE city=? AND state=? AND locality=?;"
            result = cursor.execute(query, (city, state, locality))
            for row in result:
                localityId = row[0]

            # if new locality has not been added
            if localityId == 0:
                abort(404)

        query = "INSERT INTO requests(hall, localityId, date, people, food, snacks, rooms, budget) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
        cursor.execute(query,(args["hall"], localityId, args["date"], args["people"], args["food"], args["snacks"], args["rooms"], args["budget"]))

        # get id of recently added request
        new_requestId = 0
        query = "select requestId from requests"
        for row in cursor.execute(query):
            new_requestId = row[0]  
        
        # print(str(new_requestId) + "" + str(localityId))
        from requestsHotels import RequestsHotels
        obj = RequestsHotels()
        status = obj.add_requestsHotels(new_requestId, localityId, connection, cursor)
        # obj.post(new_requestId, localityId)
        del obj 

        connection.commit()
        connection.close()

        return "", 200

        

