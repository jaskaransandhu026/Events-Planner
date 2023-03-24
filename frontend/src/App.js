import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetail';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

// when looking to return the closest error page as we are in Events.js -> loader function 
// we only need to add the errorElement set to the Error Page in the root element.

// :eventId route has no element rather it is used to group the next two routes so that they 
// can share the same loader function and therefore the loader function does not have to be repeated twice 
// in the code -> is therefore accessed through useRouteLoaderData(<id>)

// loaders are for fetching data and actions are for sending data
const router = createBrowserRouter([
  {path: '/', element: <RootLayout />, errorElement: <ErrorPage />, children: [
    {index: true, element: <HomePage />},
    {path: 'events', element: <EventsRootLayout />, children: [
      {index: true, element: <EventsPage />, loader: eventsLoader }, // /events
      {path: ':eventId', loader: eventDetailLoader, id: 'event-detail', children: [  
        {index: true, element: <EventDetailPage />, action: deleteEventAction}, // events/<eventId>
        {path: 'edit', element: <EditEventPage />, action: manipulateEventAction}, // events/<eventId>/edit
      ]},
      {path: 'new', element: <NewEventPage />, action: manipulateEventAction}, // events/new (not a child of <eventId>)
    ]},
    {
      path: 'newsletter', // /newsletter
      element: <NewsletterPage />,
      action: newsletterAction,
    },
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
