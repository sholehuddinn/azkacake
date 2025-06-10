import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();

  // Cek apakah username sudah ada
  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  // Hash password sebelum simpan
  const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

  // Simpan user dengan password yang sudah di-hash
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    }
  });

  return NextResponse.json({
    message: 'User created',
    user: { id: user.id, username: user.username }
  });
}
