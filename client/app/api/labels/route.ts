import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const labels = await db.label.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(labels, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, color } = await req.json();

    if (!name) {
      return new NextResponse('Bad Request', { status: 401 });
    }

    const label = await db.label.create({
      data: {
        userId: session.user.id,
        name,
        color,
      },
    });

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
