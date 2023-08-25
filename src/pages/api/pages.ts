// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextFetchEvent, NextRequest} from "next/server";

export  const config={
runtime:"edge",
};



export default function handler(req: NextRequest, res: NextFetchEvent) {
  return new Response(
      JSON.stringify({
        name:"nima"
      }),{
        status:200,
      });

}
