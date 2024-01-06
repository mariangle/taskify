import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: { taskId: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse('Bad Request', { status: 401 });
    }

    const lastSubtask = await db.subtask.findFirst({
      where: { userId: session.user.id, taskId: params.taskId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const order = lastSubtask ? lastSubtask.order : 1;
    const list = await db.subtask.create({
      data: {
        userId: session.user.id,
        taskId: params.taskId,
        name,
        order,
      },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
