import Image from 'next/image'
import Dictaphone from '@/components/dictaphone'
import UseHydration from '@/components/use-hydration'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UseHydration>
        <Dictaphone />
      </UseHydration>
    </main>
  )
}
