import { auth, signOut } from '@/lib/auth';

const page = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">signOut</button>
      </form>
    </div>
  );
};

export default page;
