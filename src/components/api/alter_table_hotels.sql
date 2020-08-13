

-- ALTER TABLE requestsHotels RENAME TO temp;
-- CREATE TABLE requestsHotels (requestId integer references requests(requestId), hotelId integer references hotels(id), bidprice integer,
--             primary key (requestId, hotelId));

-- insert into requestsHotels select * from temp;


    -- alter table requests add confirmed integer default 0;

alter table requests add confirmed_with_hotel text default "";