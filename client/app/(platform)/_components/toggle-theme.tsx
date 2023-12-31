import { useTheme } from 'next-themes';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useLayoutStore } from '@/store/layout-store';

export function ToggleTheme() {
  const { showLeftSidebar } = useLayoutStore();
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const renderButton = () => (
    <Button
      size="icon"
      className="w-full flex-center"
      variant="outline"
      onClick={toggleTheme}
    >
      {resolvedTheme === 'light' ? (
        <Icons.Sun className="w-4 h-4" />
      ) : (
        <Icons.Moon className="w-4 h-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  const renderTabs = () => (
    <Tabs defaultValue={resolvedTheme} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger
          value="light"
          onClick={() => setTheme('light')}
          className="w-full"
        >
          <span>Light</span>
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme('dark')}
          className="w-full"
        >
          <span>Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  return showLeftSidebar ? renderTabs() : renderButton();
}
