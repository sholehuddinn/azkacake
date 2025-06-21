import db from '@/lib/db'; // alias untuk prisma
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        user: {
          select: {
            username: true
          }
        },
        category: {
          select: {
            name : true
          }
        },
      }
    });
    return NextResponse.json({
      message: "data product di ambil",
      status: 200,
      data: products
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = auth.split(' ')[1];
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const body = await req.json();

    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        category_id: body.category_id,
        sold_count: body.sold_count ?? 0,
        price: body.price,
        image: body.image,
        user_id: user.id, // ambil dari JWT
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
