import EventList from "./components/event-list"
import Dictaphone from "./new/components/dictaphone"
import Link from "next/link"

import { Button } from "@nextui-org/react"
import { HiPlus } from "react-icons/hi"

export default function Page() {
  return (
    <div className="flex justify-between w-full space-x-4">
      <EventList />
      <Dictaphone />
      {/*<Link href={'/dashboard/events/new'}>
        <Button color="primary" endContent={<HiPlus/>}>
          Create Event
        </Button>   
      </Link>*/}
    </div>
  )
}
