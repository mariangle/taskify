import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks/use-mounted'
import { useGlobalStore } from '@/hooks/use-global-store'

export function ToggleTheme() {
  const { showSidebar } = useGlobalStore()
  const { setTheme, theme } = useTheme()
  const isMounted = useMounted()

  if (!isMounted) return null

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const renderButton = () => {
    return (
      <Button size="icon" className="w-full flex-center" variant="outline" onClick={toggleTheme}>
        {theme === 'light' ? <Icons.sun className="w-4 h-4" /> : <Icons.moon className="w-4 h-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const renderTabs = () => {
    return (
      <Tabs defaultValue={theme} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="light" onClick={() => setTheme('light')} className="w-full">
            <span>Light</span>
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme('dark')} className="w-full">
            <span>Dark</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
  }

  return showSidebar ? renderTabs() : renderButton()
}
