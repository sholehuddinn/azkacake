import db from "@/lib/db"

export async function GET() {
  try {
    const products = await db.Order.findMany()
    return Response.json(products)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()

    const { name, phone, address, items, status, event } = body

    if (!name || !phone || !address || !Array.isArray(items)) {
      return Response.json({ error: 'Invalid input' }, { status: 400 })
    }

    const order = await db.Order.create({
      data: {
        name,
        phone,
        status,
        address,
        event,
        items: {
          create: items.map(item => ({
            product_id: item.product_id,
            qty: item.qty,
          })),
        },
      },
      include: {
        items: true
      },
    })

    return Response.json({ success: true, order }, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ error: "id dan status harus diisi" }), { status: 400 });
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: { status }
    });

    return new Response(JSON.stringify({ success: true, data: updatedOrder }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
