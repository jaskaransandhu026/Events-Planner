import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
    // because useLoaderData will look at the pages own level or lower not the parent 
    // for the loader function and in our case we want to look at the parent so we assign 
    // id in the app.js and then use that in this hook to access the loader data.
    const data = useRouteLoaderData('event-detail');
    // event is just the field name we define in backend for the object returned

    return <EventForm method='PATCH' event={data.event}></EventForm>;
}

export default EditEventPage;