import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json()

   const response = await fetch(
     `https://api.simpleswap.io/get_exchange?api_key=${
       process.env.API_KEY as string
     }&id=${body.id}`,
     {
       method: "GET"
     }
   );

   const data = await response.json()

   if(!data.status) {
     return NextResponse.json({ error: data.description });
   } else {
      return NextResponse.json({ status: data.status });
   }
}