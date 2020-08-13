import sqlite3
from flask import Flask, session
from flask_restful import Resource, reqparse, abort

class HotelBidDashboard(Resource):
    def get(self):
        connection=sqlite3.connect("data.db")
        cursor=connection.cursor()
        requests=list(cursor.execute("select* from requests"))
        confirmed_requests=list(cursor.execute("select* from confirms"))
        requests_hotels=list(cursor.execute("select* from requestsHotels"))
        requests_users=list(cursor.execute("select* from requestsUsers"))
        users=list(cursor.execute("select* from users"))

        hotel_dashboard_data=[]
        confirmed_request_ids=[]
        for conf_req in confirmed_requests:
            confirmed_request_ids.append(conf_req[0])
        print(confirmed_request_ids)

        confirmed_hall_types=[]
        for req in confirmed_request_ids:
            confirmed_hall_types.append(requests[req-1][1])
        print(confirmed_hall_types)



        j=0
        while j<len(requests_users):
            if requests_users[j][0] in confirmed_request_ids:
                requests_users.pop(j)
                j-=1
            j+=1
        confirmed_dates=[]
        for req_id in confirmed_request_ids:
            confirmed_dates.append(requests[req_id-1][3])

        print(confirmed_dates)
        print(requests_users)

        i=0
        while i<len(requests_users):
            for j in range(len(confirmed_hall_types)):
                if requests[requests_users[i][0]-1][3]==confirmed_dates[j]:
                    print("same_date")
                    if requests[requests_users[i][0]-1][1]==confirmed_hall_types[j]:
                        print("same halltype")
                        requests_users.pop(i)
                        i-=1
            
            i+=1

        print(requests_users)
        usernames=[]
        user_ids=[]
        user_emails=[]
        j=0


        i=0
        j=0
        print(requests_hotels)
        dashboard_request_ids=[]
        for user_req in requests_users:
            dashboard_request_ids.append(user_req[0])
        while i<len(requests_hotels):
            if requests_hotels[i][0] not in dashboard_request_ids:
                requests_hotels.pop(i)
                i-=1
            i+=1

        print(dashboard_request_ids)
        print(requests_hotels)
        requests_users=list(cursor.execute("select* from requestsUsers"))
        print(requests_users)
        hotel_dashboard_data=[]

        confo_dates=[]
        for i in range(len(requests_hotels)):
            confo_dates.append(requests[requests_hotels[i][0]-1][3])
            for j in range(len(requests_users)):
                if requests_hotels[i][0]==requests_users[j][0]:
                    user_ids.append(requests_users[j][1])
        print(user_ids)
        print(confo_dates)
        for i in range(len(requests_hotels)):
            row={"hotel_id":requests_hotels[i][1],"user_id":user_ids[i],"request_id":requests_hotels[i][0],"username":users[user_ids[i]-1][3],"user_email":users[user_ids[i]-1][4],"bidprice":requests_hotels[i][2],"confirmation_date":confo_dates[i],"hall_type":requests[requests_hotels[i][0]-1][1]}
            hotel_dashboard_data.append(row)

        result={}
        result["hotel_bid_dashboard"]=hotel_dashboard_data
        return result,200