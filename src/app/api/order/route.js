import db from "@/lib/db"
import { sendEmail } from "@/lib/email";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        items: {
          select: {
            qty: true,
            product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });


    // Tambahkan gross_amount ke setiap order
    const enrichedOrders = orders.map(order => {
      const gross_amount = order.items.reduce((total, item) => {
        return total + item.qty * item.product.price;
      }, 0);

      return {
        ...order,
        gross_amount
      };
    });

    return NextResponse.json(enrichedOrders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, address, email, items, status, event } = body;

    if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });
    if (!phone) return NextResponse.json({ error: "Missing phone" }, { status: 400 });
    if (!address) return NextResponse.json({ error: "Missing address" }, { status: 400 });
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Items must be an array with at least 1 item" }, { status: 400 });
    }

    // 1. Buat order
    const order = await db.Order.create({
      data: {
        name,
        phone,
        address,
        email,
        status: status || "pending",
        event: new Date(event),
        items: {
          create: items.map((item) => ({
            product_id: item.product_id,
            qty: item.qty,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true, // ✅ wajib agar product.name tersedia
          },
        },
      },
    });

    // 2. Update stok terjual
    for (const item of order.items) {
      await db.Product.update({
        where: { id: item.product_id },
        data: {
          sold_count: {
            increment: item.qty,
          },
        },
      });
    }

    // 3. Kirim email
    await sendEmail(order);

    return NextResponse.json({ success: true, order }, { status: 201 });

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
