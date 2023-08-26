// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextFetchEvent, NextRequest} from "next/server";
import { Pool } from "@neondatabase/serverless";
import {json} from "stream/consumers";
import zod, {string} from "zod";
import sqlstring from "sqlstring";
import {extractBody} from "@/utilities/extractBody";

export  const config={
runtime:"edge",
};



const schema=zod.object({
    category:string().max(64).min(1),
    name:string().max(64).min(1),
    price:string().max(64).min(1),
    image:string().max(64).min(1),
})
async function SetMethod(req: NextRequest, event: NextFetchEvent){
    const EBody =await extractBody(req);
    if (!req.body){
        return new Response("invalid body", {
            status: 200,
        });
    }
    //generate uuid in posgressDb : (uuid_in(md5(random()::text || random()::text)::cstring)
    try {
        const {category,name,price,image}=(EBody);
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        })
        const sql =sqlstring.format(`
        INSERT INTO Products (id,category,name,price,image)
        VALUES (uuid_in(md5(random()::text || random()::text)::cstring),?,?,?,?);
       `,[
                category,name,price,image
            ]
        );
        console.log(sql)
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
        SELECT * from products;
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
 if (req.method=="POST")
     return SetMethod(req,event);
 else if (req.method=="GET")
     return getMethod(req,event)

    return new Response("invalid", {
        status: 200,
    });
}
