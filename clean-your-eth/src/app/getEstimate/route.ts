import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `https://api.simpleswap.io/get_estimated?api_key=${
      process.env.API_KEY as string
    }&fixed=${body.fixed}&currency_from=eth&currency_to=xmr&amount=${body.amount}`,
    {
      method: "GET"
    }
  );

  const amount = await response.json();

  if(amount.error) {
    return NextResponse.json({error:amount.description})
  } else {
     return NextResponse.json({ amount: amount });
  }
}