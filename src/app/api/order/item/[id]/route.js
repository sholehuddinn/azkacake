import db from "@/lib/db";

export async function GET(_, { params }) {
  const order_id = params.id;

  try {
    const items = await db.OrderItem.findMany({
      where: { order_id },
      include: {
        product: true, // supaya bisa ambil nama & harga produk
      },
    });

    return new Response(JSON.stringify({ success: true, items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
