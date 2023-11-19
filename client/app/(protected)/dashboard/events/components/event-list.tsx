import { Card, CardBody } from "@nextui-org/react";
import Event from "./event";
import { getEvents } from "@/helpers/actions/get-events";

const EventList = async () => {
const { events, err } = await GetEvents();

if (err){
  return "An unexpected error occured. Try logging in again.";
}
  
  return (
    <div className="flex-1">
       { events && events.length === 0 ? (
      <Card>
        <CardBody>
          <p className="text-small text-default-500">You have no events.</p>
        </CardBody>
      </Card>
       ) : (
        <div className="grid grid-cols-2 gap-4">
        {events?.map((event) => (
          <Event key={event.id} event={event}/>
        ))}
        </div>
       )}
    </div>
  )
}

const GetEvents = async () => {
  try {
    const events = await getEvents();
    return {
      err: null,
      events: events,
    };
  } catch (err){
    console.log(err)
    return {
      err: err,
      events: null,
    };
  }
};

export default EventList