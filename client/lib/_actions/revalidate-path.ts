'use server';

import { revalidatePath } from 'next/cache';

type RevalidateConfig = {
  path: string;
  type?: 'layout' | 'page';
};

export async function revalidate(config: RevalidateConfig) {
  revalidatePath(config.path, config.type);
}
