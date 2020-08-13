import sqlite3
from flask import Flask, request
from flask_restful import Resource,reqparse, abort

class User(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('firstname', required=True)
    parser.add_argument('lastname', required=True)
    parser.add_argument('username', required=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)
	
	
    # function to find user by id
    @classmethod
    def find_by_id(cls,userId):
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        query="SELECT * FROM users WHERE id=?"
        result=cursor.execute(query,(userId,))
        row=result.fetchone()
        connection.close()

        if row:
            return{
                userId:{
                    "firstname":row[1],
                    "lastname":row[2],
					"username":row[3],
					"email":row[4],
					"password":row[5]

                }
            }
    
    def getid(self, useremail):

        print("inside getid function")

        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        query="SELECT id FROM users WHERE email=?"
        result=cursor.execute(query,(useremail,))
        user_id = 0
        for row in result:
            user_id = row[0]
        connection.close()

        print("userId = ")
        print(str(user_id))
        # if user_id > 0:
        #     abort(404, message='user already exists')
        
        return user_id
        
            
    # implementing GET protocol
    def get(self,userId):
        user=self.find_by_id(userId)
        if user:
            return user
        return {"message":"user not found"}, 404

    # implementing DELETE protocol
    def delete(self,userId):
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        query="DELETE FROM users WHERE id=?"
        cursor.execute(query,(userId,))
        connection.commit()
        connection.close()
        return {"message":"deleted user with id {} successfully".format(userId)}
    
#    @classmethod
#    def insert(cls,user):
#        connection=sqlite3.connect("data.db")
#        cursor=connection.cursor()
#        query="INSERT INTO users VALUES(?,?,?)"
#        cursor.execute(query,(user["id"],user["username"],user["age"]))
#        connection.commit()
#        connection.close()
#        return user,201

    @classmethod
    def update(cls,user):
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        query="UPDATE users SET firstname=?,lastname=?,username=?,email=?,password=? WHERE id=?"
        cursor.execute(query,(user["firstname"],user["lastname"],user['username'],user["email"],user["password"],user["id"]))
        connection.commit()
        connection.close()
    
    # implementing PUT protocol
    def put(self,userId):
        
        data=User.parser.parse_args()
        user=self.find_by_id(userId)
        updated_user={"id":userId,"firstname":data["firstname"],"lastname":data["lastname"],"username": data['username'],"email":data["email"],"password":data["password"]}

        if user is None:
            abort(404, message="user id {} not found".format(userId))
#            self.insert(updated_user)
        
        else:
            self.update(updated_user)
        
        return updated_user


class UserList(Resource):

    def get(self):
        connection=sqlite3.connect("data.db")
        
        cursor=connection.cursor()
        query="SELECT * FROM users"
        result=cursor.execute(query)
        users=[]
        for row in result:
            users.append({row[0]:{"firstname":row[1],"lastname":row[2],"username":row[3],"email":row[4],"password":row[5]}})

        connection.close()
        return {"users":users}
        
    def post(self):
        #enable server connection
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        
        # enable parse args
        args = User.parser.parse_args()
        print("inside post")
        # execute query
        firstname = args["firstname"]
        lastname = args["lastname"]

        checknewuser =  User()
        getid = checknewuser.getid(args['email'])
        print("user id = ", str(getid))
        if getid == 0:
            query = "INSERT INTO users (firstname,lastname,username,email,password) VALUES (?, ?, ?, ?, ?)"
            cursor.execute(query, (firstname,lastname,args['username'],args['email'],args['password']))
        else:
            abort(404, message="user already exists!")

        connection.commit()
        connection.close()

        return "", 200
