import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
    // hook to check the current route transition state, essentially when going from one page to another
    // this allows us to show "loading screen/text" while the next route page is being rendered.
    const navigation = useNavigation();

    // value will be either idle, submitting or loading
    // navigation.state
    
    return ( 
        <React.Fragment>
            <MainNavigation />
            <main>
                {/*navigation.state === 'loading' && <p>Loading...</p>*/}
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;