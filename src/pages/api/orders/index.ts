// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextFetchEvent, NextRequest} from "next/server";
import { Pool } from "@neondatabase/serverless";
import {json} from "stream/consumers";
import zod, {array, string} from "zod";
import sqlstring from "sqlstring";
import {extractBody} from "@/utilities/extractBody";

export  const config={
runtime:"edge",
};



const schema=zod.object({

    // id:string().max(512).min(1),
    count:string().max(64).min(1),
    sum:string().max(64).min(1),
    items: array(string()),
    fullname:string().max(64).min(1),
    mobile:string().max(64).min(1),
    // items: zod.object({
    //     id: zod.string(),
    //     name: zod.string(),
    //     price: zod.string(),
    //     count: zod.string(),
    // }

})
async function SetMethod(req: NextRequest, event: NextFetchEvent){
    const EBody =await extractBody(req);
    if (!req.body){
        return new Response("invalid body", {
            status: 200,
        });
    }
    console.log("EBody",EBody)
    //generate uuid in posgressDb : (uuid_in(md5(random()::text || random()::text)::cstring)
    try {
        const {count,sum,items,fullname,mobile}=schema.parse(EBody);
        console.log("fullname",fullname);
        console.log("items",items);
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        })
       //  const sql =sqlstring.format(`
       // INSERT INTO orders (id,count,sum,items,fullname,mobile)
       //  VALUES (
       //  uuid_in(md5(random()::text || random()::text)::cstring),
       //    ?,?,
       //  ARRAY[?],?
       //  );
       //  `,[
       //          count,sum,items,fullname,mobile
       //      ]
       //  );
        const sql =sqlstring.format(`
       INSERT INTO orders (id,count,sum,items,fullname,mobile)
        VALUES (
        uuid_in(md5(random()::text || random()::text)::cstring
        ),?,?,ARRAY [?],?,?);
 
        `,[
                count,sum,items,fullname,mobile
            ]
        );
        const {rows} = await pool.query(sql);

        event.waitUntil(pool.end());
        return new Response(
            "insert successful - OK", {
                status: 200,
            });
    }catch (e){
        return new Response(
            "not valid", {
                status: 400,
            });
    }

}
async function getMethod(req: NextRequest, event: NextFetchEvent){

    const eBody =await extractBody(req);
    console.log("extractBody",eBody);
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })

    const sql = `
        SELECT id,count,sum,items,fullname,mobile,created_at FROM orders;
    `;

    const {rows} = await pool.query(sql);
    const firstRow=rows[0];
    event.waitUntil(pool.end());
    return new Response(
        JSON.stringify({
            rows
        }), {
            status: 200,
        });
}

export default async function handler(req: NextRequest, event: NextFetchEvent) {
 if (req.method=="POST") {
     return SetMethod(req, event);
 }
 else if (req.method=="GET")
     return getMethod(req,event)

    return new Response("invalid", {
        status: 200,
    });
}



