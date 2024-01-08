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
    <Button variant="outline" onClick={toggleTheme} className="w-10 p-2">
      {resolvedTheme === 'light' ? (
        <Icons.Sun className="w-3 h-3" />
      ) : (
        <Icons.Moon className="w-3 h-3" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  const renderTabs = () => (
    <Tabs defaultValue={resolvedTheme} className="w-full">
      <TabsList className="w-full p-1">
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
