import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { Icons } from '@/components/icons'

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

const features: Feature[] = [
  {
    title: 'Adaptive Planning',
    description: 'Dynamic adjustments to priorities and deadlines.',
    icon: <Icons.calendar className="w-4 h-4" />,
  },
  {
    title: 'Collaborative',
    description: 'Boost productivity with collaborative features',
    icon: <Icons.users className="w-4 h-4" />,
  },
  {
    title: 'Highly Customizable',
    description: 'Tailor the app to your unique needs',
    icon: <Icons.appearance className="w-4 h-4" />,
  },
  {
    title: 'External Integrations',
    description: 'Connect and synchronize with your favorite tools and platforms',
    icon: <Icons.integration className="w-4 h-4" />,
  },
]

export default function Features() {
  return (
    <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 mt-12">
      {features.map(({ title, description, icon }) => (
        <Card key={title}>
          <CardHeader className="space-y-2">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-muted w-8 h-8 mr-3 bg-emerald-50 text-emerald-500">{icon}</div>
              <h4 className="text-sm font-semibold">{title}</h4>
            </div>
            <CardDescription className="m-0 ml-0 pl-0">{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
