import ListService from '@/services/list-service'
import MobileSelect from './_components/mobile-select'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const lists = await ListService.getLists()
  return (
    <div className="space-y-2 w-full">
      <div className="lg:hidden">
        <MobileSelect lists={lists} />
      </div>
      {children}
    </div>
  )
}
