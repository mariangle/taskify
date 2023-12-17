'use client'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { config } from '@/lib/config'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useGlobalStore } from '@/hooks/use-global-store'
import { ListResponse } from '@/types'
import { Icons } from '@/components/icons'
import { defaultEmoji } from '@/lib/constants'

interface SideNavProps {
  lists?: ListResponse[]
  className?: string
}

export function SideNav({ lists, className }: SideNavProps) {
  const path = usePathname()
  const { showSidebar } = useGlobalStore()

  return (
    <nav>
      {config.platform.links.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group relative flex h-12 justify-start text-foreground rounded-none border-r-2 border-transparent',
            path === item.href && 'bg-gradient-to-l from-primary/20 border-primary hover:bg-primary/25',
            showSidebar ? 'justify-start' : 'justify-center',
          )}
        >
          <item.icon className={cn('h-5 w-5 ', path === item.href && 'text-primary')} />
          <span className={cn('absolute left-12 text-base', !showSidebar && className)}>{item.label}</span>
        </Link>
      ))}
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value={'my-lists'} className="border-none">
          <AccordionTrigger
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'group relative flex h-12 justify-start text-foreground rounded-none',
              showSidebar ? 'justify-between' : 'justify-center',
            )}
          >
            <div>
              <Icons.menu className={cn('h-5 w-5')} />
            </div>
            <div className={cn('absolute left-12 text-base', !showSidebar && className)}>My Lists</div>
            {showSidebar && <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />}
          </AccordionTrigger>
          <AccordionContent>
            {lists?.map((item) => (
              <Link
                key={item.id}
                href={`/lists/${item.id}`}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'group flex h-12 gap-x-3 rounded-none border-r-2 border-transparent',
                  path === `/lists/${item.id}` && 'bg-gradient-to-l from-primary/20 border-primary hover:bg-primary/25',
                  showSidebar ? 'justify-between' : 'justify-center',
                )}
              >
                <span>{item.emoji || defaultEmoji}</span>
                <span className={cn('absolute left-12', !showSidebar && className)}>{item.name}</span>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  )
}
