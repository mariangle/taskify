import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { labelId: string } },
) {
  try {
    if (!params.labelId) {
      return new NextResponse('Label Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // TODO: Authorize user

    const { name, color } = await req.json();

    const label = await db.label.update({
      where: {
        id: params.labelId,
      },
      data: {
        name,
        color,
      },
    });

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { labelId: string } },
) {
  try {
    if (!params.labelId) {
      return new NextResponse('Label Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const label = await db.label.delete({
      where: {
        id: params.labelId,
      },
    });

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
