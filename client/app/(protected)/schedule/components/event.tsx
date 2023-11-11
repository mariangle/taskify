"use client"

import { IEventApiResponse as IEvent } from "@/types"
import { formatter } from "@/helpers/util"
import EventService from "@/helpers/services/event-service"
import { useRouter } from "next/navigation"

interface EventProps {
    event: IEvent,
}

const Event = ({
    event,
}: EventProps) => {
  const router = useRouter();

  const onDelete = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId)
      router.refresh();
    } catch (err){
      if (err instanceof Error){
        alert(err.message)
      }
    }
  }

  return (
    <div className="border">
        <p>title {event.title}</p>
        <p>startdate{formatter(event.startDate)}</p>
        <p>enddate {event.endDate ? formatter(event.endDate) : 'No end date'}</p>
        <p>userid{event.userId}</p>
        <button onClick={() => onDelete(event.id)}>delete</button>
    </div>
  )
}

export default Event