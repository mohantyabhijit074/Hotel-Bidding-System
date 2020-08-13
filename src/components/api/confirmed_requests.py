import sqlite3
from flask import Flask,session
from flask_restful import Resource, reqparse, abort


class ConfirmedRequests(Resource):
    
    def get(self):
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        requests_users=list(cursor.execute("select * from requestsUsers"))
        users=list(cursor.execute("select* from users"))
        confirmed_req=list(cursor.execute("select* from confirms"))
        print(confirmed_req)
        requests=list(cursor.execute("select * from requests"))

        requests_hotels=list(cursor.execute("select * from requestsHotels"))
        print(requests_hotels)
        confirmed=[]
        for req in confirmed_req:
            print(req)
            for request in requests_hotels:
                if req[0]==request[0] and req[1]==request[1]:
                    confirmed.append(request)

        print(confirmed)

        confirmation_dates=[]
        hall_types=[]
        for req in confirmed:
            for request in  requests:
                if request[0]==req[0]:
                    confirmation_dates.append(request[3])
                    hall_types.append(request[1])

        # print(confirmation_dates)

        confirmed_user_ids=[]
        for req in confirmed_req:
            for request in requests_users:
                if req[0]==request[0]:
                    confirmed_user_ids.append(request[1])
        # print(confirmed_user_ids)

        confirmed_usernames=[]
        confirmed_user_emails=[]
        for user_id in confirmed_user_ids:
            for user in users:
                if user_id==user[0]:
                    confirmed_usernames.append(user[3])
                    confirmed_user_emails.append(user[4])

        # print(confirmed_user_emails)
        confirmed_table_data=[]
        for i in range(len(confirmed)):
            print(i)
            row={"hotel_id":confirmed[i][1],"user_id":confirmed_user_ids[i],"request_id":confirmed_req[i][0],"username":confirmed_usernames[i],"user_email":confirmed_user_emails[i],"bidprice":confirmed[i][2],"confirmation_date":confirmation_dates[i],"hall_type":hall_types[i]}
            confirmed_table_data.append(row)

        # print(confirmed_table_data)
        result={}
        result["confirmed_table_data"]=confirmed_table_data
        return result,200

