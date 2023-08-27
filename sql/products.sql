CREATE TABLE products (
id UUID PRIMARY KEY,
category VARCHAR (255),
name VARCHAR (255),
price VARCHAR (255),
image VARCHAR (1024),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
)

INSERT INTO Products (id,category,name,price,image)
VALUES (uuid_in(md5(random()::text || random()::text)::cstring),'nn','pizza1','200','img');