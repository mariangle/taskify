import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { LOGIN_PATH } from '@/routes';

export const getLists = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect(LOGIN_PATH);
  }

  const lists = await db.list.findMany({
    where: { userId: session.user?.id },
  });

  return lists;
};
