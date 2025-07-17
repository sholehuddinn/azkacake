import db from '@/lib/db'; // alias untuk prisma
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

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

    const formData = await req.formData();

    const name = formData.get('name');
    const description = formData.get('description');
    const category_id = formData.get('category_id');
    const price = parseInt(formData.get('price'));
    const image = formData.get('image');
    const sold_count = 0;

    if (!image || typeof image.name !== 'string') {
      return NextResponse.json({ error: 'Gambar tidak valid' }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), 'public/image', filename);

    await writeFile(filepath, buffer);

    const product = await db.product.create({
      data: {
        name,
        description,
        category_id,
        sold_count,
        price,
        image: filename, // hanya simpan nama file
        user_id: user.id,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

