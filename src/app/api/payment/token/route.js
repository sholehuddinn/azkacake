import MidtransClient from 'midtrans-client';

const snap = new MidtransClient.Snap({
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,

});
export async function POST(req) {
  try {
    const body = await req.json();
    //  body: { order_id, gross_amount, customer_details }


    const parameter = {
      transaction_details: {
        order_id: body.order_id,
        gross_amount: body.gross_amount,
      },
      customer_details: body.customer_details,
    };

    const snapToken = await snap.createTransaction(parameter);
    return new Response(JSON.stringify({ token: snapToken.token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to create snap token' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
