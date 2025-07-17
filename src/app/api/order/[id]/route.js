import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const order = await db.order.findUnique({
      where: { id: params?.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Hitung gross_amount (qty * product price)
    const gross_amount = order.items.reduce((total, item) => {
      return total + item.qty * item.product.price;
    }, 0);

    return NextResponse.json({
      ...order,
      gross_amount
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
