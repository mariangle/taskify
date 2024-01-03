import _uniqueId from 'lodash/uniqueId';
import SidebarLink from './sidebar-link';

import { config } from '@/lib/config';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const overviewLinks = [
  { text: 'Getting Started', href: '/docs/getting-started' },
  { text: 'Account Setup', href: '#' },
  { text: 'Features', href: '/docs/features' },
];
export default function Sidebar() {
  return (
    <aside className="md:top-20 md:sticky md:self-start p-2 md:w-64 md:max-h-screen overflow-y-auto">
      <h2 className="font-semibold mb-2">Overview</h2>
      <ul className="text-sm">
        {overviewLinks.map((link) => (
          <SidebarLink link={link} key={_uniqueId('link_')} />
        ))}
      </ul>
      {config.marketing.docsLinks.map((section) => (
        <ul key={section.heading} className="text-sm">
          <Accordion type="single" collapsible>
            <AccordionItem value={section.heading}>
              <AccordionTrigger>{section.heading}</AccordionTrigger>
              <AccordionContent>
                {section.links.map((link) => (
                  <SidebarLink link={link} key={_uniqueId('link_')} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      ))}
    </aside>
  );
}
