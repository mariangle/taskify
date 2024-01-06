import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } },
) {
  try {
    if (!params.taskId) {
      return new NextResponse('Task Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // TODO: Authorize user

    const { name, listId, description, dueDate, priority, isComplete } =
      await req.json();

    const task = await db.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        userId: session.user.id,
        name,
        listId,
        description,
        isComplete,
        dueDate,
        priority,
      },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } },
) {
  try {
    if (!params.taskId) {
      return new NextResponse('Task Id is required', { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const subtasks = await db.subtask.findMany({
      where: {
        taskId: params.taskId,
      },
    });

    await Promise.all(
      subtasks.map((subtask) =>
        db.subtask.delete({
          where: { id: subtask.id },
        }),
      ),
    );

    const task = await db.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
