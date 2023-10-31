import Dictaphone from "@/components/dictaphone"
import UseHydration from "@/components/use-hydration"

export default function Scheduler() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <UseHydration>
          <Dictaphone />
      </UseHydration>
    </div>
  )
}
