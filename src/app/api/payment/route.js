import db from "@/lib/db";
import { paymentSuccess } from "@/lib/email";

export async function POST(req) {
  try {
    const { orderId, midtransOrderId, status, paymentType, transactionTime, vaNumbers } =
      await req.json();

    if (!orderId || !midtransOrderId || !status) {
      return new Response(
        JSON.stringify({ error: "orderId, midtransOrderId, dan status wajib diisi" }),
        { status: 400 }
      );
    }

    // Cek apakah payment sudah ada
    const existingPayment = await db.payment.findUnique({
      where: { orderId },
    });

    if (existingPayment) {
      return new Response(
        JSON.stringify({ error: "Pembayaran untuk order ini sudah ada." }),
        { status: 400 }
      );
    }

    // Ambil data order + items
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order tidak ditemukan" }),
        { status: 404 }
      );
    }

    const grossAmount = order.items.reduce((total, item) => {
      return total + item.qty * item.product.price;
    }, 0);

    // Simpan ke tabel payment
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

    // Update status order
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status: "dibayar" },
    });

    // Kirim email bukti pembayaran
    try {
      if (order.email) {
        await paymentSuccess(order.email, order, {
          transaction_time: transactionTime,
          payment_type: paymentType,
          transaction_id: midtransOrderId,
          va_numbers: vaNumbers || null,
        });
      } else {
        console.warn("⚠️ order.email tidak tersedia. Email tidak dikirim.");
      }
    } catch (err) {
      console.error("❌ Gagal mengirim email:", err.message);
    }

    return new Response(
      JSON.stringify({ success: true, payment, updatedOrder }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
