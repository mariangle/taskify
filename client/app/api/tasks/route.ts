import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const tasks = await db.task.findMany({
      where: { userId: session.user.id },
      include: {
        subtasks: true,
        labels: true,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
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

    const { name, listId, description, dueDate, priority } = await req.json();

    if (!name) {
      return new NextResponse('Bad Request', { status: 401 });
    }

    let lastTask;

    if (listId) {
      lastTask = await db.task.findFirst({
        where: { listId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
    } else {
      lastTask = await db.task.findFirst({
        where: { listId: null },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
    }

    const newOrder = lastTask ? lastTask.order + 1 : 1;

    const list = await db.task.create({
      data: {
        userId: session.user.id,
        name,
        listId,
        description,
        dueDate,
        priority,
        order: newOrder,
      },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
