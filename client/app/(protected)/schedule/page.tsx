import Dictaphone from "@/components/dictaphone"
import UseHydration from "@/components/use-hydration"
import EventList from "./components/event-list"

export default function Page() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <EventList />
      <UseHydration>
          <Dictaphone />
      </UseHydration>
    </div>
  )
}
