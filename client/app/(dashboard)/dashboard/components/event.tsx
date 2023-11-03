import { IEventApiResponse as IEvent } from "@/types"

import { formatter } from "@/helpers/util/formatter"

interface EventProps {
    event: IEvent
}

const Event = ({
    event
}: EventProps) => {
  return (
    <div className="border">
        <p>id {event.id}</p>
        <p>title {event.title}</p>
        <p>startdate{formatter(event.startDate)}</p>
        <p>enddate {event.endDate ? formatter(event.endDate) : 'No end date'}</p>
        <p>userid{event.userId}</p>
    </div>
  )
}

export default Event