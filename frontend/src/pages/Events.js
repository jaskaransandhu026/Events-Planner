import { useLoaderData, json } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    // hook can be used to get access to the closest loader data -> from function in app.js 
    // the original method is async and returns a promise, but that is handled by react router for u
    // lower level route can use this hook to get the data from the loader function, but a higher level
    // route in the hierarchy cannot -> that would return undefined.
    const events = useLoaderData();

    if (events.isError){
        return <p>{events.message}</p>
    }


    /*
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedEvents, setFetchedEvents] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchEvents() {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/events');

            if (!response.ok) {
                setError('Fetching events failed.');
            } else {
                const resData = await response.json();
                setFetchedEvents(resData.events);
            }
            setIsLoading(false);
        }

        fetchEvents();
    }, []);

    */


    // for the to prop we can use either `/events/${event.id}` -> absolute path 
    // or we can use relative path and just provide the id, 'event.id'

    // remember here we are trying to create a EventDetailPage for each event in the dummy events array 
    // however the EventDetailPage isnt a component, it isnt going to be nested inside this page, we are just specifying
    // the url to go to in the Link 'to' prop, which we will create dynamically.


    return (
        <>
            {<EventsList events={events} />}
        </>
    );
}

export default EventsPage;

// instead of bloating app.js with loader functions, write it here and then export to app.js
export const loader = async () => {
    // usually get request inside useEffect which triggers after component is rendered.
    // This allows the data to be fetched from here before and then the component can be rendered with the data.
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

        // return {isError: true, message: 'Could not fetch events.'};
        
        // method two -> throw , react router when seeing this will render the closest error element
        //throw new Response(JSON.stringify({ message: "Could not fetch events."}, { status: 500 }));

        // for convenience there is a json utility function in router which converts to json format for u 
        return json({ message: "Could not fetch events."}, { status: 500 });
    } else {
        const resData = await response.json();
        // returned data will be made available to the component being rendered as well as any other component 
        // that needs it.
        return resData.events;

        // can also return a response object -> modern browser feature 
        //const res = new Response('any data', {status: 201});
        //return res;

    }
}









