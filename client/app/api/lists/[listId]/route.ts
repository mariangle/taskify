import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { listId: string } },
) {
  try {
    if (!params.listId) {
      return new NextResponse('List Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // TODO: Authorize user

    const { name } = await req.json();

    const list = await db.list.update({
      where: {
        id: params.listId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listId: string } },
) {
  try {
    if (!params.listId) {
      return new NextResponse('List Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const list = await db.list.delete({
      where: {
        id: params.listId,
      },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
