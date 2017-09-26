import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class Reports extends Component {
    hello = () => {
        console.log("Ho!");  
    };
    
    render () {
        return (
            <div>
                <h1>Music Reports</h1>
                <DatePicker hintText="Start Date" />
                <DatePicker hintText="End Date" />
                <RaisedButton
                    label="Submit"
                    onClick={this.hello}
                />
            </div>
        );
    }
}

export default Reports;