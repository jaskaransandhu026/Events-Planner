import { useRouteLoaderData,json,redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
    // can be used to access the path params from url of page
    //const params = useParams();

    // getting the data from the loader function fetch request
    const data = useRouteLoaderData('event-detail');


    return (
        <EventItem event={data.event}></EventItem>
    );
}

export default EventDetailPage;

// the react router passes two parameters to the loader function automatically 
// request => returns url 
// params => returns path params
export const loader = async ({request,params}) => {
    const id = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + id);

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for selected event'}, {
            status: 500,
        });
    } else {
          // react router will extract data from promise
        return response;
    }
};

// remember that the loader function is here as not to bloat app.js 
// otherwise it has nothing to do with the EventDetailPage component code.

export const action = async ({params, request}) => {
    const eventId = params.eventId; //name is eventId because that is what is used in app.js

    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });

    if (!response.ok){
        throw json({ message: 'Could not delete event.'}, {
            status: 500,
        });
    }

    return redirect('/events');
};