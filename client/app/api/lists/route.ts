import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthenticated', { status: 403 });
  }

  try {
    const lists = await db.list.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json(lists);
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse('Bad Request', { status: 401 });
    }

    const lastList = await db.list.findFirst({
      where: { userId: session.user.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const order = lastList ? lastList.order : 1;
    const list = await db.list.create({
      data: {
        userId: session.user.id,
        name,
        order,
      },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
