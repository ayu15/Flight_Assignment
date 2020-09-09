import React from 'react';
import axios from 'axios';

import FlightDetails from './FlightDetails';
import RangeSlider from './RangeSlider';

class FlightForm extends React.Component{
    //defined all state variables here
    state = {
        originCity: "",
        destinationCity: "",
        departureDate: "",
        returnDate: "",
        passengerNumber: "",
        disableReturnDate: true,
        filterResponse: [],
        filterReturnResponse: [],
        disableFlightDetails: true,
        sliderMinValue: 0,
        sliderMaxValue: 10000,
        disableFlag: false
    }
    
    //on click of one way and return button functionality
    handleClick = (event) => {
        event.target.name === "oneWayButton" ? this.setState({disableReturnDate: true}) : 
            this.setState({disableReturnDate: false})
    }
    
    //on change of any value enter by the user
    handleChange = (event) => {
        this.setState({
                [event.target.name] : event.target.value
            }
        )
    }

    //on click of search button
    handleSearch = async (event) =>{
        event.preventDefault();
        let responseApi = await axios.get('./flights.json');
        this.setState({
            filterResponse : responseApi.data.flightInfo.filter((city) => {
                if(this.state.returnDate === ""){
                    return city.originCity === this.state.originCity && city.destinationCity === this.state.destinationCity 
                    && city.price >= this.state.sliderMinValue && city.price <= this.state.sliderMaxValue;
                } else{
                    return (city.originCity === this.state.originCity || city.originCity === this.state.destinationCity ) 
                    && (city.destinationCity === this.state.destinationCity || city.destinationCity === this.state.originCity)
                    && city.price >= this.state.sliderMinValue && city.price <= this.state.sliderMaxValue;
                }
            }),
            disableFlightDetails : false,
            disableFlag: true
        })
        if(this.state.returnDate !== ""){
            this.setState({
                filterReturnResponse : this.state.filterResponse.filter((city) => {
                    if(city.originCity === this.state.destinationCity){
                        return city.originCity === this.state.destinationCity
                    }
                }),
                filterResponse : this.state.filterResponse.filter((city) => {
                    if(city.originCity === this.state.originCity){
                        return city.originCity === this.state.originCity
                    }
                })
            })
        } 
    }

    // on change of price slider
    handleSlider = (val1, val2) =>{
        this.setState({
            sliderMinValue: val1,
            sliderMaxValue: val2
        })
    }

    render(){
        return(
            <>
            <div className="flight-form-wrapper">
                <h3>Flight Form</h3>
                <div className="search-flight">
                    <div className="buttons-wrapper">
                        <button disabled={this.state.disableFlag} className="one-way-button" name="oneWayButton" onClick={this.handleClick}>One way</button>
                        <button disabled={this.state.disableFlag} className="return-button" name="returnButton" onClick={this.handleClick}>Return</button>
                    </div>
                    <div className="form-wrapper">
                        <form onSubmit={this.handleSearch}>
                            <input className="form-elem" type="text" name="originCity" placeholder="Enter Origin City" 
                            value={this.state.originCity} onChange={this.handleChange} disabled={this.state.disableFlag} required />
                            <input className="form-elem" type="text" name="destinationCity" placeholder="Enter Destination City"
                            value={this.state.destinationCity} onChange={this.handleChange} disabled={this.state.disableFlag} required/>
                            <input className="form-elem" type="text" name="departureDate" placeholder="Departure Date" 
                            value={this.state.departureDate} onChange={this.handleChange} disabled={this.state.disableFlag} 
                            onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} required/>
                            <input className="form-elem" type="text" name="returnDate" placeholder="Return Date"
                            value={this.state.returnDate} onChange={this.handleChange} 
                            disabled={this.state.disableReturnDate || this.state.disableFlag} 
                            onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} required/>
                            <input className="form-elem" type="number" name="passengerNumber" placeholder="Passengers"
                            value={this.state.passengerNumber} onChange={this.handleChange} disabled={this.state.disableFlag} required/>

                            <button disabled={this.state.disableFlag}>Search</button>
                        </form>
                    </div>
                </div>

                <div className="slider-wrapper">
                    <div className="refine-search">Refine Flight Search</div>
                    <div className="range-wrapper" disabled={this.state.disableFlag}>
                        <div className="min-value">{this.state.sliderMinValue}</div>
                        <div className="max-value">{this.state.sliderMaxValue}</div>
                        <RangeSlider min="0" max="10000" scale="exp" sliderChange={this.handleSlider} />
                    </div>
                </div>
            </div>
            <FlightDetails 
                details={this.state.filterResponse}
                returnDataDetails={this.state.filterReturnResponse}
                disableFlightDetails={this.state.disableFlightDetails}
                departDate={this.state.departureDate}
                returnDate={this.state.returnDate}
            />
            </>
        );
    }
}

export default FlightForm;