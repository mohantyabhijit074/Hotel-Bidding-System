from flask import Flask, redirect, request, session, make_response, render_template
from flask_restful import Api, reqparse
from flask_cors import CORS, cross_origin
from users import User, UserList
from hotels import HotelList, Hotel
from requests import Request, RequestList
from requestsHotels import RequestsHotels
from requestsUsers import RequestsUsers
from confirm import Confirm
from chats import Chats 
from hotel_dashboard import HotelBidDashboard
from confirmed_requests import ConfirmedRequests




import sqlite3 as sql 

app=Flask(__name__)
api=Api(app)

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',  # React
  ],

  'SECRET_KEY': '...'
}
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)
app.secret_key = 'random string'

### GLOBAL VARIABLES

userId = 0
user_name = ""   # store username
user_email = ""  # store user email

##########

api.add_resource(User, '/users/<string:userId>')
api.add_resource(Hotel, '/hotels/<int:hotelId>')
api.add_resource(Request, '/requests/<int:requestId>')
api.add_resource(RequestsHotels, '/sendrequeststohotels', '/sendrequeststohotels/<requestId>/<hotelId>')
api.add_resource(RequestsUsers, '/sendrequeststousers', '/sendrequeststousers/<requestId>/<userId>')
api.add_resource(Confirm, '/confirms')
api.add_resource(HotelBidDashboard,'/hotel_bid_dashboard')
api.add_resource(ConfirmedRequests,'/confirmed_requests')


##########

@app.route("/users", methods=["POST", "GET"])
def users():
    if request.method == 'POST':
        obj = UserList()
        print("calling obj post methods")
        status = obj.post()
        return redirect("http://localhost:3000/userdashboard")
    else:
        obj = UserList()
        return obj.get()

@app.route("/hotels", methods=["POST", "GET"])
def hotels():
 if request.method == 'POST':
    obj = HotelList()
    status = obj.post()
    return redirect("http://localhost:3000/hotelbiddashboard")
 else:
    obj = HotelList()
    return obj.get()

@app.route("/requests", methods=["POST", "GET"])
def requests():
 if request.method == 'POST':
     obj = RequestList()
     status = obj.post(userId)
     return redirect("http://localhost:3000/userdashboard")
 else:
     obj = RequestList()
     return obj.get()


###########################################

@app.route("/login", methods=["POST"])
def login():
    if request.method == 'POST':

        print("logging in")

        #username = request.form['username']
        #password = request.form['password']
        #session['username'] = username
        

        parser = reqparse.RequestParser()
        parser.add_argument("username")
        parser.add_argument("useremail")
        parser.add_argument("password")

        args = parser.parse_args()
        global user_name
        global user_email
        user_name = args['username']
        user_email = args['useremail']
        password = args['password']
        print("user email from login = ", user_email)

        user = User()
        global userId
        # userId = user.getid(user_name)
        userId = user.getid(user_email)
        del user 

        session['userId'] = userId
        session['username'] = user_name
        session['useremail'] = user_email

        print("session[userid] = ", session['userId'])
        # resp = make_response(' store the cookies ')
        # #  using the set method ， to store key-values  formal data 
        # resp.set_cookie('userId', "3")
        # r = request.cookies.get('userId')
        print("userID logged in ", userId)
        print("logged in ")
        return redirect("http://localhost:3000/userhome")

@app.route("/logout", methods=['GET'])
def logout():
    if 'username' not in session:
        return '<h1>user has not logged in</h1>'
    else:
        username = session['username']
        useremail = session['useremail']
        userId = session['userId']
        session.pop('username', None)
        session.pop('useremail', None)
        session.pop('userId', None)

        # userid = request.cookies.get('userId')
        # resp = make_response('delete the cookie')
        # resp.delete_cookie('userId')
        
        return '<h1> ' + useremail + ' with userId ' + str(userId) + ' and cookie' + ' has logged out </h1>'

############################################

@app.route("/getrequestid", methods=["GET"])
def getrequestid():
    requestId = 0
    req = RequestsUsers()
    global userId
    print("userId = ", userId)
    requestId = req.get_requestId(userId)
    return {'requestId': requestId}

@app.route("/getrequestbyid", methods=["GET"])
def getrequestbyid():
    requestId = 0
    request = []
    req = Request()
    requestid=getrequestid()
    requestid=requestid["requestId"]
    request.append(req.get_by_id(requestid))
    del req
    return {"request":request}


@app.route("/getuserid", methods=["GET"])
def getuserid():
    # if 'userId' not in session:
    #     return {'userId': 0}
    global userId
    if userId == 0:
        return {'userId': 0}
    print("get user id = ", userId)
    # userId = session['userId']
    print("user id = ", userId)

    global user_name
    global user_email 
    return {'userId': userId, 'username': user_name, 'email': user_email}

@app.route("/gethotelid", methods=['GET'])
def gethotelid():
    parser = reqparse.RequestParser()
    parser.add_argument('hotelname')
    args = parser.parse_args()
    obj = Hotel()
    print(args['hotelname'])
    status = obj.find_by_hotelname(args['hotelname'])
    del obj
    return {'hotelId': status}

@app.route("/getlocalityId", methods=['POST'])
def getlocalityId():
    from location import Location
    obj = Location()
    status = obj.getLocalityId()
    del obj 
    return status,200

##########################

@app.route("/hotel_login", methods=['POST'])
def hotel_login():
    if request.method == 'POST':

        print("hotel logging in")

        hotelname = request.form['hotelname']
        password = request.form['password']
        session['hotelname'] = hotelname
        
        hotel = Hotel()
        hotelId = hotel.getid(hotelname)
        del hotel 

        session['hotelId'] = hotelId
        print("logged in ")
        return redirect("http://localhost:3000/HotelbidDashboard")

@app.route("/hotel_logout", methods=['GET'])
def hotel_logout():
    if 'hotelname' not in session:
        return '<h1>hotel has not logged in</h1>'
    else:
        hotelname = session['hotelname']
        hotelId = session['hotelId']
        session.pop('hotelname', None)
        session.pop('hotelId', None)
        return '<h1> ' + hotelname + ' with userId ' + str(hotelId) + ' has logged out </h1>'

##########################

@app.route("/chats", methods=["GET", "POST"])
def chats():
    status = "", 404
    if request.method == "GET":
        print("get method of chats")
        obj = Chats()
        status = obj.get()
        del obj 
        return status
    else:
        newchat = Chats()
        status = newchat.post()
        print("status of chats post = ", status)
        del newchat
        return "", 200
        

##############################

@app.route("/confirmbid", methods=['PUT','DELETE'])
def confirmbid():
    parser = reqparse.RequestParser()
    parser.add_argument('requestid')
    parser.add_argument('hotelname')
    parser.add_argument('hotelid')
    parser.add_argument('confirmed')

    args = parser.parse_args()

    if request.method == "PUT":
        obj = Request()
        print(args['confirmed'])
        status = obj.confirmBid(args['requestid'], args['hotelname'], args['confirmed'])
        del obj 

        obj = Confirm()
        status = obj.post(args['requestid'], args['hotelid'])
        return status 

    elif request.method == "DELETE":
        obj = Request()
        print("delete request id - ", args['requestid'], args['confirmed'])
        status = obj.confirmBid(args['requestid'], args['hotelname'], args['confirmed'])
        del obj 

        obj = Confirm()
        status = obj.delete(args['requestid'], args['hotelid'])
        del obj
        return status



if __name__=="__main__":
    app.run(debug=True)
