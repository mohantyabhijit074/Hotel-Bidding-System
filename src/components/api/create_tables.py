import sqlite3
connection=sqlite3.connect("data.db")
cursor=connection.cursor()

create_query="CREATE TABLE users(id INTEGER PRIMARY KEY,firstname text, lastname text, username text,email text, password text)"
cursor.execute(create_query)

users=[
    (1,"gagan","mahesh","gaganmahesh","gaganmahesh2@gmail.com","1234"),
    (2,"gag","asd","asdf","asdf@gmail.com","20")
]
insert_query="INSERT INTO users VALUES(?,?,?,?,?,?)"
cursor.executemany(insert_query,users)

select_query="SELECT * FROM users"

for row in cursor.execute(select_query):
    print(row)


create_hotels="CREATE TABLE hotels(id INTEGER PRIMARY KEY, name text, email text, phone INTEGER(10))"
cursor.execute(create_hotels)
hotels=[
    (1,"HotelA","abc@xy.com", 2602345),
    (2,"HotelB","hotelb@ab.com", 290298)
]
insert_hotel="INSERT INTO hotels VALUES(?,?,?,?)"
cursor.executemany(insert_hotel,hotels)
select= "SELECT * FROM hotels"
for row in cursor.execute(select):
    print(row)


create_locality = "CREATE TABLE locality(localityId INTEGER PRIMARY KEY, state TEXT, city TEXT, locality TEXT);"
cursor.execute(create_locality)

locality = [
    (1, "karnataka", "bangalore", "bannerghatta road"),
    (2, "karnataka", "bangalore", "outer ring road"),
    (3, "maharashtra", "mumbai", "andheri")
]

insert_query = "INSERT INTO locality VALUES (?, ?, ?, ?);"
cursor.executemany(insert_query, locality)


create_request = "CREATE TABLE requests(requestId INTEGER PRIMARY KEY, hall TEXT, localityId INTEGER references locality(localityId), date TEXT, people INTEGER, food TEXT, snacks INTEGER, rooms INTEGER, budget INTEGER);"
cursor.execute(create_request)

requests = [
    (1,'banquethall', 1, '1-1-2021', 300, 'veg', 1, 10, 2000000)
]

insert_query = "INSERT INTO requests VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
cursor.executemany(insert_query, requests)

select= "SELECT * FROM requests;"
for row in cursor.execute(select):
    print(row)

    
connection.commit()
connection.close()
