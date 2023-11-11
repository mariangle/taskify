import Event from "./event";
import { getEvents } from "@/helpers/actions/get-events";
const GetEvents = async () => {

  try {
    const events = await getEvents();
    return {
      err: null,
      events: events,
    };
  } catch (err){
    return {
      err: err,
      events: null,
    };
  }
};
const EventList = async () => {
const { events, err } = await GetEvents();

if (err){
  return "err occured";
}
  
  return (
    <div>
        {events?.map((event) => {
            return <Event key={event.id} event={event}/>;
        })}
    </div>
  )
}

export default EventList