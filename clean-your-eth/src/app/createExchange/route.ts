import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `https://api.simpleswap.io/create_exchange?api_key=${
      process.env.API_KEY as string
    }&fixed=${body.fixed}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fixed: body.fixed,
        currency_from: body.token_one,
        currency_to: body.token_two,
        amount: body.amount_to_send,
        address_to: body.address,
        extra_id_to: "",
        user_refund_address: body.refund_address,
        user_refund_extra_id: "",
      }),
    }
  );
  const data = await response.json();
  if (!data.id) {
    return NextResponse.json({
      error: data.description,
    });
  } else {
    return NextResponse.json({
      exchange_id: data.id,
      amount_to_receive: data.amount_to,
      receive_address: data.address_from,
    });
  }
}
