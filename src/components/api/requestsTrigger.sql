create trigger update_requestsHotels_on_request after insert
on requests 
begin
    insert into requestsHotels (requestId, hotelId)
    select requestId, id from requests, hotels 
    where requestId = new.requestId and id = (select id from hotels where locationId = new.localityId);
end