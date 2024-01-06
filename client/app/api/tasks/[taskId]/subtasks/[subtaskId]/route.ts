import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string; subtaskId: string } },
) {
  try {
    if (!params.taskId || !params.subtaskId) {
      return new NextResponse('Task Id and Subtask Id is required', {
        status: 400,
      });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // TODO: Authorize user

    const { name, isComplete } = await req.json();

    const subtask = await db.subtask.update({
      where: {
        id: params.subtaskId,
        taskId: params.taskId,
      },
      data: {
        name,
        isComplete,
      },
    });

    return NextResponse.json(subtask, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string; subtaskId: string } },
) {
  try {
    if (!params.taskId || !params.subtaskId) {
      return new NextResponse('Task Id and Subtask Id is required', {
        status: 400,
      });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const subtask = await db.subtask.delete({
      where: {
        id: params.subtaskId,
        taskId: params.taskId,
      },
    });

    return NextResponse.json(subtask, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
