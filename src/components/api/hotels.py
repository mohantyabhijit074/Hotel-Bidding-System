import sqlite3
from flask_restful import Resource, reqparse, abort

class Hotel(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name", required=True)
    parser.add_argument("email", required=True)
    parser.add_argument("phone", required=True)
    parser.add_argument("category")
    parser.add_argument("type")
    parser.add_argument("locationId")

    @classmethod
    def get_by_id(cls, hotelId):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "SELECT * FROM hotels WHERE id=?"
        result = cursor.execute(query,(hotelId,))
        row = result.fetchone()
        connection.close()
        if row:
            return{
                hotelId:{
                    "name": row[1],
                    "email": row[2],
                    "phone": row[3]
                }
            }

    @classmethod
    def find_by_hotelname(cls, hotelname):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "SELECT * FROM hotels WHERE name=?"
        result = cursor.execute(query,(hotelname,))
        row = result.fetchone()
        connection.close()
        #print('hotelId = ', row[0])
        if row:
            return row[0]
        else:
            return 0

    def getid(self, hotelname):

        print("inside getid function")

        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        query="SELECT id FROM hotels WHERE name=?"
        result=cursor.execute(query,(hotelname,))
        hotel_id = 0
        for row in result:
            hotel_id = row[0]
        connection.close()

        print("hotelId = ")
        print(str(hotel_id))
        # if user_id > 0:
        #     abort(404, message='user already exists')
        
        return hotel_id

    def get(self, hotelId):
        result = self.get_by_id(hotelId)
        if result:
            return result
        return {"message":"hotel not found"}
        

    def delete(self,hotelId):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "DELETE FROM hotels WHERE id=?"
        cursor.execute(query,(hotelId,))
        connection.commit()
        connection.close()
        return {"message":"hotel with id {} is deleted succesfully".format(hotelId)}



    @classmethod
    def insert(cls, hotel):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "INSERT INTO hotels VALUES(?,?,?)"
        cursor.execute(query,(hotel["name"], hotel["email"], hotel["phone"]))
        connection.commit()
        connection.close()
        return hotel, 201

    @classmethod
    def update(cls, hotel):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "UPDATE hotels SET name=?,email=?, phone=? WHERE id=?"
        cursor.execute(query,(hotel["name"], hotel["email"], hotel["phone"], hotel["id"]))
        connection.commit()
        connection.close()
        return hotel, 201


    def put(self,hotelId):
        hotel = self.get_by_id(hotelId)
        data = Hotel.parser.parse_args()
        updated_hotel = {"id": hotelId, "name": data["name"], "email": data["email"], "phone": data["phone"]}
        if hotel is None:
            self.insert(updated_hotel)
        
        else:
            self.update(updated_hotel)
        
        return updated_hotel


class HotelList(Resource):
    def get(self):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "SELECT * FROM hotels"
        result = cursor.execute(query)
        hotels = []
        for row in result:
            hotels.append({"id": row[0], "name": row[1], "email": row[2], "phone": row[3], "locationId": row[4], "category": row[5], "type": row[6], "requirement_rating": row[7]})

        return {"hotels": hotels}

    def post(self):
        #enable server connection
        connection=sqlite3.connect("data.db")
        cursor = connection.cursor()
        
        # enable parse args
        args = Hotel.parser.parse_args()

        if Hotel.find_by_hotelname(args['name']) != 0:
            abort(500, message="hotel admin already exists")
        
        # execute query
        name = args['name']

        query = "INSERT INTO hotels(name, email, phone, category, type, locationId) VALUES (?, ?, ?, ?, ?, ?)"
        cursor.execute(query, (args['name'], args['email'], args['phone'], args['category'], args['type'],args['locationId']))
        connection.commit()
        
        connection.close()
