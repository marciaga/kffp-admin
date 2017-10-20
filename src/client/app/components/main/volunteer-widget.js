import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import VolunteerCard from '../reports/volunteer-card';
import { submitReport } from '../../actions/volunteerActions';

const hoursThisMonth = (results = []) => results.reduce((acc, o) => (acc + o.hours), 0);
const currentMonth = moment().format('MMMM');

class VolunteerWidget extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        endDate: PropTypes.instanceOf(Date),
        results: PropTypes.array,
        startDate: PropTypes.instanceOf(Date),
        userId: PropTypes.string
    };

    constructor (props) {
        super(props);

        this.state = {
            toggleForm: false
        };
    }

    handleClick = () => this.setState({ toggleForm: !this.state.toggleForm });

    renderTableRows = (results) =>
        results.map(({ date, type, hours }) => (
            <TableRow>
                <TableRowColumn>{moment(date).format('MM/DD/YYYY')}</TableRowColumn>
                <TableRowColumn>{hours}</TableRowColumn>
                <TableRowColumn>{type}</TableRowColumn>
            </TableRow>
        ))

    render () {
        const {
            userId,
            startDate,
            endDate,
            dispatch,
            currentHours,
            results = []
        } = this.props;

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>
                        My volunteer hours for {currentMonth}:
                    </h1>
                    <div style={{ fontSize: 18 }}>{currentHours || 0 } hours</div>
                    <div style={{ margin: 10 }}>
                        <FlatButton
                            label="Add Hours"
                            onClick={() => dispatch(push('/volunteers/entry'))}
                        />
                        <FlatButton
                            label="Search Past Hours"
                            onClick={this.handleClick}
                        />
                    </div>
                </div>
                <div style={{
                    display: this.state.toggleForm ? 'block' : 'none'
                }}>
                    <VolunteerCard
                        userId={userId}
                        submitAction={submitReport}
                        dispatch={dispatch}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <Table
                        style={{ width: '600px' }}
                        selectable={false}
                    >
                        <TableHeader
                            adjustForCheckbox={false}
                            displaySelectAll={false}
                        >
                            <TableRow>
                               <TableHeaderColumn>Date</TableHeaderColumn>
                               <TableHeaderColumn>Hours</TableHeaderColumn>
                               <TableHeaderColumn>Type</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                        {this.renderTableRows(results)}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default VolunteerWidget;
