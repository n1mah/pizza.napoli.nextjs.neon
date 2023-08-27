CREATE TABLE orders (
id UUID PRIMARY KEY,
count VARCHAR (255),
sum VARCHAR (255),
items VARCHAR [],
fullname VARCHAR (255),
mobile VARCHAR (255),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO orders (id,count,sum,items,fullname,mobile)
        VALUES (
        uuid_in(md5(random()::text || random()::text)::cstring),
          '2','2300',
        ARRAY ['[1asasas,pizza1,1,200]','[2dsa323,pizza2,1,150]'],'nimaaa'
        );