import MidtransClient from 'midtrans-client';

export async function POST(req) {
  try {
    const body = await req.json();
    //  body: { order_id, gross_amount, customer_details }

    // Inisialisasi Midtrans snap client
    const snap = new MidtransClient.Snap({
      isProduction: true, 
      serverKey: process.env.SECRET,
      clientKey: process.env.NEXT_PUBLI_CLIENT,
    });

    const parameter = {
      transaction_details: {
        order_id: body.order_id,
        gross_amount: body.gross_amount,
      },
      customer_details: body.customer_details,
      credit_card: {
        secure: true,
      },
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
