import { Icons } from '@/components/ui/icons';

const footer = () => (
  <footer className="px-6 dark:bg-[#00021242] bg-opacity-50">
    <div className="py-10 max-w-screen-lg mx-auto flex-between">
      <div className="font-semibold text-lg">taskify</div>
      <div>
        <Icons.GitHub className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>
    </div>
    <div className="max-w-screen-lg mx-auto h-px bg-transparent bg-gradient-to-r from-transparent via-border to-transparent opacity-75" />
    <div className="py-6 max-w-screen-lg mx-auto sm:flex-between md:grid-cols-2 space-y-4 md:space-y-0">
      <div className="flex-gap gap-4 text-xs text-muted-foreground">
        <div>Privacy Policy</div>
        <div>·</div>
        <div>Terms of Conditions</div>
      </div>
      <div className="text-xs text-muted-foreground">
        © 2024 Taskify. All rights reserved.
      </div>
    </div>
  </footer>
);

export default footer;
