import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function SocialsActions() {
  const loginSocial = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="space-y-4 max-w-sm w-full mx-auto">
      <div className="flex-gap">
        <div className="w-full h-[1px] bg-border" />
        <div className="whitespace-nowrap text-sm px-2">Or continue with</div>
        <div className="w-full h-[1px] bg-border" />
      </div>
      <div className="flex-gap mt-4 gap-4">
        <Button
          type="button"
          disabled
          variant="secondary"
          className="w-full"
          onClick={() => loginSocial('google')}
        >
          <Icons.Google className="w-4 h-4 mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled
          className="w-full"
          onClick={() => loginSocial('github')}
        >
          <Icons.GitHub className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      </div>
    </div>
  );
}
