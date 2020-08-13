
create table chats (chatId integer primary key, hotelId integer references hotels(id), userId integer references users(id), messages text, sender integer);

