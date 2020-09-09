import React from 'react';
import FlightForm from './FlightForm';
// import FlightDetails from './FlightDetails';

const Content = () => {
    return(
        <div className="wrapper-content">
            <FlightForm />
            {/* <FlightDetails /> */}
            <div className="clear"></div>
        </div>
    );
}

export default Content;