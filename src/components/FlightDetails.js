import React from 'react';

const FlightDetails = (props) => {

        const flightDescription = props.details.map(
            (detail, index) => {
                if(props.returnDate !== "" && props.returnDataDetails.length > 0){
                    return (
                        <div className="details-body-wrapper">
                            <div className="details-body return-details" key={detail.flightNo}>
                                <div className="price">Rs. {detail.price}</div>
                                <div className="flight-number">{detail.flightNo}</div>
                                <div className="city-code">{detail.originCityCode} {'>'} {detail.destinationCityCode}</div>
                                <div className="departure-time">Depart: {detail.departureTime}</div>
                                <div className="arrival-time">Arrive: {detail.arrivalTime}</div>
                            </div>
                            <div className="details-body return-details" key={props.returnDataDetails.flightNo}>
                                <div className="price">Rs. {props.returnDataDetails[index].price}</div>
                                <div className="flight-number">{props.returnDataDetails[index].flightNo}</div>
                                <div className="city-code">{props.returnDataDetails[index].originCityCode} {'>'} {props.returnDataDetails[index].destinationCityCode}</div>
                                <div className="departure-time">Depart: {props.returnDataDetails[index].departureTime}</div>
                                <div className="arrival-time">Arrive: {props.returnDataDetails[index].arrivalTime}</div>
                            </div>
                            <div className="book-flight">
                                <button>Book this flight</button>
                            </div>
                            <div className="clear"></div>
                        </div>    
                    )
                } else{
                    return (
                        <div className="details-body-wrapper">
                            <div className="details-body" key={detail.flightNo}>
                                <div className="price">Rs. {detail.price}</div>
                                <div className="flight-number">{detail.flightNo}</div>
                                <div className="city-code">{detail.originCityCode} {'>'} {detail.destinationCityCode}</div>
                                <div className="departure-time">Depart: {detail.departureTime}</div>
                                <div className="arrival-time">Arrive: {detail.arrivalTime}</div>
                            </div>
                            <div className="book-flight">
                                <button>Book this flight</button>
                            </div>
                            <div className="clear"></div>
                        </div>    
                    )
                }
            }
        );
        
        const detailsHeader = (flag) => {
            // const returnFlag = props.details;
            if(flag === true){
                return (
                    <div className="details-header">
                        <div><h3>No flights to show.</h3></div>
                    </div>
                )
            } else{
                if(props.details.length === 0){
                    return (
                        <div className="details-header">
                            <div><h3>No Flights available between selected cities.</h3></div>
                        </div>
                    ) 
                } else{
                    return (
                        <div className="details-header">
                            {returnDetails(props.returnDate)}
                        </div>
                    ); 
                }       
            }
        }

        const returnDetails = (ret) => {
            if(ret === ""){
                return(
                    <>
                        <div className="code-wrapper">
                            {props.details[0].originCity} {'>'} {props.details[0].destinationCity}
                        </div>
                        <div className="date-wrapper">
                            <div className="departure-date">Depart: {props.departDate}</div>
                        </div>
                        <div className="clear"></div>
                    </> 
                )   
            } else{
                return(
                    <>
                        <div className="code-wrapper">
                            {props.details[0].originCity} {'>'} {props.details[0].destinationCity} {'>'} {props.details[0].originCity}
                        </div>
                        <div className="date-wrapper">
                            <div className="departure-date">Depart: {props.departDate}</div>
                            <div className="return-date">Return: {props.returnDate}</div>
                        </div>
                        <div className="clear"></div>
                    </>
                )
            }
        }

        return(
            <>
                <div className="flight-details-wrapper">
                    <h3>Flight Details</h3>
                    {detailsHeader(props.disableFlightDetails)}
                    {flightDescription}
                </div>
            </>
        );
    }

export default FlightDetails;