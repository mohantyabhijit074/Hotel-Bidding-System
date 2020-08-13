from flask import Flask, session 
from flask_restful import Resource,reqparse,abort
import sqlite3 as sql

class RequestsUsers(Resource):
    def get_userId(self,UserId,connection,cursor):
        userId=[]
        query="select id from users where id=?"
        for row in cursor.execute(query,(UserId,)):
            userId.append(row[0])
        
        if userId==[]:
            abort(500,message="no users with given id!")

        return userId

    def get_requestId(self, userId):
        connection = sql.connect("data.db")
        cursor = connection.cursor()
        print("inside get_requestId = ", userId)
        query = "select requestId from requestsUsers where UserId=?"
        result = cursor.execute(query, (userId,))
        requestId = 0
        for row in result:
            requestId = row[0]
        if requestId == 0:
            abort(404, message="request not found")
        return requestId

    def add_resquestsUsers(self,requestId,UserId,connection,cursor):
        userid_list = []
        userid_list = self.get_userId(UserId,connection,cursor)
        
        print(userid_list)

        for u_id in range(0,len(userid_list)):
            query = "INSERT INTO requestsUsers(requestId, UserId) VALUES (?, ?)"
            cursor.execute(query, (requestId, userid_list[u_id]))
        return "", 200


    def get(self):
        connection = sql.connect("data.db")
        cursor = connection.cursor()
        
        query = 'SELECT * FROM requestsUsers'
        result = cursor.execute(query)
        request_users_list = []   
        for row in result:
            request_users_list.append({ "requestId": row[0], "UserId": row[1]})

        connection.close()
        return request_users_list, 200

    def delete(self, requestId, UserId):
        connection = sql.connect("data.db")
        cursor = connection.cursor()

        query = 'DELETE FROM requestsUsers WHERE requestId=? and UserId=?'
        cursor.execute(query, (requestId, UserId))
        connection.commit()
        connection.close()
        return "deleted", 204
    
    def post(self):

        connection = sql.connect('data.db')
        cursor = connection.cursor()

        parser = reqparse.RequestParser()
        parser.add_argument("requestId")
        parser.add_argument("UserId")
        args = parser.parse_args()
        
        self.add_resquestsUsers(args['requestId'], args['UserId'], connection, cursor)
        connection.commit()
        #query = "select UserId from requestsUsers where requestId = ? and id in (select id from users where id = ?)"
        #result = cursor.execute(query, (args['requestId'] ,args['UserId']))


        return "", 200
