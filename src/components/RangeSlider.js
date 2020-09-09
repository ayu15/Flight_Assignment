import React from 'react';
import './RangeSlider.css';

class RangeSlider extends React.Component{
    state = {
        min: this.props.min,
        max: this.props.max
    }  

    handleMinChange = (event) => {
        this.setState({
            min: event.target.value,
            max: this.state.max
        });
        this.props.sliderChange(this.state.min, this.state.max);
    }
      
    handleMaxChange = (event) => {
        this.setState({
            min: this.state.min,
            max: event.target.value
        });
        this.props.sliderChange(this.state.min, this.state.max);
    }


    render() {
        return (
          <div className="range-slider">
            <span> </span>
            <input type="range"
                   value={this.state.min}
                   onChange={this.handleMinChange}
                   min={this.props.min} 
                   max={this.props.max} />
            <input type="range"
                   value={this.state.max}
                   onChange={this.handleMaxChange}
                   min={this.props.min} 
                   max={this.props.max} />
          </div>
        );
    }
}

export default RangeSlider;