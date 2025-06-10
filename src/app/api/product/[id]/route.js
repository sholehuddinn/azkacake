import db from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi untuk cek dan verifikasi token
function verifyToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or invalid token");
  }
  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
}

export async function GET(req, { params }) {
  try {
    verifyToken(req);

    const product = await db.product.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { username: true } },
        category: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PUT(req, { params }) {
  try {
    verifyToken(req);

    const body = await req.json();

    const updated = await db.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category_id: body.category_id,
        sold_count: body.sold_count,
        price: body.price,
        image: body.image,
        updated_at: new Date()
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  try {
    verifyToken(req);

    await db.product.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
