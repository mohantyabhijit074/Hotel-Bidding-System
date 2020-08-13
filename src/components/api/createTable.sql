create table requestsHotels(id integer primary key, requestId integer references requests(requestId), hotelId integer references hotels(id));

