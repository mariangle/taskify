import { Icons } from '@/components/shared/icons'

export default function Footer() {
  return (
    <footer className="py-8 border-t bg-gray-50/30">
      <div className="max-w-screen-lg mx-auto grid md:grid-cols-3 ">
        <div className="">
          <div className="font-semibold">.taskify</div>
          <div className="text-xs text-muted-foreground">
            This site is still a work in progress, you will see some broken things.
          </div>
        </div>
        <div className="text-xs flex-center">© 2024 .taskify. All rights reserved.</div>
        <div className="flex-center justify-end">
          <Icons.gitHub className="w-4 h-4" />
        </div>
      </div>
    </footer>
  )
}
