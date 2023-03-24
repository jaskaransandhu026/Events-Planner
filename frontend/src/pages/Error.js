import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from "../components/PageContent";

const ErrorPage = () => {
    // hook can be used to extract information about the error
    const error = useRouteError();

    // if you threw a response object 'new Response()' then this field will contain the status 
    // throwing anything else like an normal js object would mean that the variable error contains everything
    // then there would not be a status field
    
    // default text to be rendered
    let title = 'An error occurred!';
    let message = 'Something went wrong.';

    // In the case of a server error 
    if (error.status === 500){
        // error.data returns the content of the error in json
        //message = JSON.parse(error.data).message;

        // if json utility function is used then dont need to parse manually here either 
        message = error.data.message;
    }

    if (error.status === 404){
        title="Not Found";
        message="Could not find resource or page.";
    }


    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
        
};

export default ErrorPage;