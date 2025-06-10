import MidtransClient from 'midtrans-client';

export async function POST(req) {
  try {
    const notification = await req.json();

    // Inisialisasi Midtrans core client untuk verifikasi
    const core = new MidtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Verifikasi status transaksi
    const statusResponse = await core.transaction.notification(notification);

    // statusResponse berisi info transaksi dari Midtrans
    // kamu bisa update status pembayaran di database sesuai order_id dan transaction_status

    console.log('Midtrans notification:', statusResponse);

    // Contoh update DB (pseudo code)
    // await db.order.update({
    //   where: { order_id: statusResponse.order_id },
    //   data: { status: statusResponse.transaction_status }
    // });

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Midtrans notification error:', error);
    return new Response('Error', { status: 500 });
  }
}
