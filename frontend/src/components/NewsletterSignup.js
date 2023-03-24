import React,{ useEffect } from 'react';
import { useFetcher } from 'react-router-dom'
import classes from './NewsletterSignup.module.css';

// cant use the normal Form component to submit for this because this form is displayed for all pages 
// as part of the MainNavigation. Therefore, we would have to add the action to all routes.
function NewsletterSignup() {
    // object contains many useful properties and methods including a Form 
    const fetcher = useFetcher();

    // get access to action/loader returned data thru
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message){
            window.alert(data.message);
        }
    }, [data,state]);

    // this form component will still trigger an action but not initialize a route transition
    // this hook should be used when u want to use a loader or an action without actually having to 
    // navigate to where the action/loader belong/ so you dont transition to the route to which the action belongs 
    // after submitting the form.
    return (
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}>
        <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        />
        <button>Sign up</button>
    </fetcher.Form>
    );
}

export default NewsletterSignup;