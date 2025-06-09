import db from "@/lib/db";

export async function POST(req) {
  try {
    const { orderId, midtransOrderId, status, paymentType, transactionTime } =
      await req.json();

    if (!orderId || !midtransOrderId || !status) {
      return new Response(
        JSON.stringify({
          error: "orderId, midtransOrderId, dan status wajib diisi",
        }),
        { status: 400 }
      );
    }

    const existingPayment = await db.payment.findUnique({
      where: { orderId },
    });

    if (existingPayment) {
      return new Response(
        JSON.stringify({ error: "Pembayaran untuk order ini sudah ada." }),
        { status: 400 }
      );
    }

    // Ambil order beserta items dan product
    const order = await db.Order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true, // supaya bisa akses harga
          },
        },
      },
    });

    // console.log("Order Items:", order.items);


    if (!order) {
      return new Response(JSON.stringify({ error: "Order tidak ditemukan" }), {
        status: 404,
      });
    }

    // Hitung total harga
    const grossAmount = order.items.reduce((total, item) => {
      return total + item.qty * item.product.price;
    }, 0);

    // Simpan data payment
    const payment = await db.payment.create({
      data: {
        orderId,
        midtransOrderId,
        status,
        paymentType: paymentType || null,
        transactionTime: transactionTime ? new Date(transactionTime) : null,
        grossAmount,
      },
    });

    return new Response(JSON.stringify({ success: true, data: payment }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
