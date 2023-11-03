import EventService from "@/helpers/services/event-service";
import Event from "./event";

const eventservice = new EventService();

const GetEvents = async () => {
    const events = await eventservice.getEvents();
    return events;
};
const EventList = async () => {
    const events = await GetEvents();
  return (
    <div>
        {events.map((event) => {
            return <Event key={event.id} event={event} />;
        })}
    </div>
  )
}

export default EventList