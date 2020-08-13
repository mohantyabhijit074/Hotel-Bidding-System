from flask_restful import Resource, reqparse, abort 

import sqlite3 as sql 

class Chats(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("hotelId")
    parser.add_argument("userId")
    parser.add_argument("message")
    parser.add_argument("sender")
    parser.add_argument("hotelname")
    parser.add_argument("username")
    parser.add_argument("useremail")
    parser.add_argument("timestamp")

    def get(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()

        query = 'SELECT * FROM chats'
        result = cursor.execute(query)
        chats = []
        for row in result:
            chats.append({"chatId": row[0], "hotelId": row[1], "userId": row[2], "message": row[3], "sender": row[4], "timestamp": row[5]})

        connection.close()
        return {"chats": chats}, 200

    # def post(self):
    #     connection = sql.connect('data.db')
    #     cursor  = connection.cursor()

    #     args = Chats.parser.parse_args()
    #     print("chat inserted")
    #     query = 'insert into chats (hotelId, userId, messages, sender) values (?, ?, ?, ?)'
    #     cursor.execute(query, (args['hotelId'], args['userId'], args['message'], args['sender']))

    #     connection.commit()
    #     connection.close()
    #     return '', 200

    def post(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()
        args = Chats.parser.parse_args()

        hotelId = 0
        print("hotelname = ", args['hotelname'])
        from hotels import Hotel
        obj = Hotel()
        hotelId = obj.getid(args['hotelname'])
        print("hotelId = ", hotelId)
        del obj 

        userId = 0
        print("username = ", args['username'])
        print("useremail = ", args['useremail'])
        from users import User 
        obj = User()
        userId = obj.getid(args['useremail'])
        print("userId = ", userId)
        del obj 

        if hotelId == 0 or userId == 0:
            abort(404, message="hotel doesnt exist")
        else:
            args["hotelId"] = hotelId
            args["userId"] = userId

        
        
        query = 'insert into chats (hotelId, userId, messages, sender, timestamp) values (?, ?, ?, ?, ?)'
        cursor.execute(query, (hotelId, userId, args['message'], args['sender'], args['timestamp']))

        connection.commit()
        connection.close()
        return '', 200
        

    def delete(self):
        connection = sql.connect('data.db')
        cursor = connection.cursor()
        args = Chats.parser.parse_args()

        query = 'delete from chats where hotelId = ? and userId = ?'
        cursor.execute(query, (args['hotelId'], args['userId'])) 

        connection.commit()
        connection.close()
        return '', 204

    def options(self, *args, **kwargs):
      self.response.headers['Access-Control-Allow-Origin'] = 'localhost'
      self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      self.response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'

    # def deleteAll_hotel(self, hotelId):
    #     connection = sql.connect('data.db')
    #     cursor = connection.cursor()

    #     query = 'delete from chats where hotelId = ?'
    #     cursor.execute(query, (hotelId, ))

    #     return '', 204

    # def deleteAll_user(self, userId):
    #     connection = sql.connect('data.db')
    #     cursor = connection.cursor()

    #     query = 'delete from chats where userId = ?'
    #     cursor.execute(query, (userId, ))

    #     return '', 204

