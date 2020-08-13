CREATE TABLE requestsUsers (
    requestId integer references requests(requestId), 
    UserId integer references users(id),
    primary key (requestId, UserId));
