import { redirect } from 'next/navigation';
import { List } from '@prisma/client';
import { db } from '@/lib/db';
import { LOGIN_PATH } from '@/routes';

export const getList = async (listId: string): Promise<List> => {
  const list = await db.list.findUnique({
    where: { id: listId },
  });

  if (!list) {
    redirect(LOGIN_PATH);
  }
  return list;
};
