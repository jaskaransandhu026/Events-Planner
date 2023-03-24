import { useActionData,useNavigation,useNavigate,Form,redirect,json } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // similiar to useLoaderData, useActionData gives us access to the data returned by our action
  // in our context this will contain error data in the case of invalid new event form submission
  const data = useActionData();

  const navigate = useNavigate();

  // provides information about what was submitted, 
  // the state field contains information about the current transition.
  const navigation = useNavigation();

  // while it is submitting, we can disable the submit button
  const isSubmitting = navigation.state === 'submitting';
  
  function cancelHandler() {
    navigate('..');
  }


  // using the event data to pre-populate the form
  // Use Form component provided by react router, this prevents the reload auto form behaviour and 
  // collects and gives all the form data to the action method.
  // explicitly stating the action, add 'action="/some other route"' prop to the Form tag
  // but if you want to trigger the action of the currently active route then you dont need the action 
  // prop.

  // Object.values() iterates through the keys

  // NewEvent and EditEvent will set the method they are using here, via the method field of the props
  return (
    <Form method={method} className={classes.form}>
      { data && data.errors && <ul>{Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}</ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

// this action will service both editing event and creating new event, it is being reused.
// Can distinguish between the two based on the methods used.

// request will contain the form data from the EventForm component
export const action = async ({request,params}) => {
  // getting the form data from request argument 
  const formData = await request.formData();

  // getting the http method from the request argument
  const method = request.method;

  const eventData = {
      title: formData.get('title'),
      image: formData.get('image'),
      date: formData.get('date'),
      description: formData.get('description'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH'){
    const eventId = params.eventId; 
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
  });

  if (!response.ok){
      // backend throws 422 when data entered in form is invalid
      if (response.status === 422){
          return response;
      }

      throw json({ message: "Could not save event."}, { status: 500 });
  }

  // redirect the user after submitting
  // this is another function provided by react router, heavy lifting done behind the scenes 
  // all you need to do is supply the url of the page you want to redirect to. 
  return redirect('/events');
};