import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import TableConfig from './tableConfig';
import { setUpdateFormData } from '../../actions/formActions';
import { filterResults } from '../../actions/modelActions';
import { showOrHideModal } from '../../actions/modalActions';
import { debounce, humanReadableTime } from '../../utils/helperFunctions';
import { UPDATE_FILTER_RESULTS } from '../../constants';

const mapStateToProps = state => ({
    tableConfig: TableConfig,
    model: state.model
});

class MainTable extends Component {
    constructor (props) {
        super(props);

        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableRowCell = this.renderTableRowCell.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.sortDisplayData = this.sortDisplayData.bind(this);
        this.debouncedHandler = this.debouncedHandler.bind(this);
        this.debounceTextField = this.debounceTextField.bind(this);
        this.debouncer = debounce(this.debouncedHandler, 1000);
    }

    componentWillUnmount () {
        this.props.dispatch({
            type: UPDATE_FILTER_RESULTS,
            data: []
        });
    }

    debouncedHandler (val) {
        this.props.dispatch(filterResults(val));
    }

    debounceTextField (e, value) {
        this.debouncer(value);
    }

    sortDisplayData (data) {
        if (!data) {
            return [];
        }

        const { fields } = this.props.model;
        const keys = Object.keys(fields);

        return data.map(m =>
            keys.reduce((memo, v) => {
                memo[v] = m[v];
                return memo;
            }, {})
        );
    }

    handleRowSelection (selectedRows) {
        if (selectedRows.length) {
            const modelName = this.props.model.name;
            const rowIndex = selectedRows[0];
            const rowData = this.props.model.filteredResults[rowIndex];

            this.props.dispatch(setUpdateFormData('edit', modelName, rowData));
            this.props.dispatch(showOrHideModal(true));
        }
    }

    renderTableHeader () {
        const { fields } = this.props.model;

        return Object.keys(fields).map((f, i) => {
            const { label } = fields[f];

            return (
                <TableHeaderColumn
                    tooltip={label}
                    key={i}
                >
                    {label}
                </TableHeaderColumn>
            );
        });
    }

    renderTableBody () {
        const { model } = this.props;
        const tableData = this.sortDisplayData(model.filteredResults);

        return tableData.map((item, index) => (
            <TableRow
                key={index}
                selected={item.selected}
            >
                {this.renderTableRowCell(item)}
            </TableRow>
        ));
    }

    renderTableRowCell (item) {
        return Object.keys(item).map((r, i) => {
            let value = item[r];
            // TODO @ma: if value is an array and contains objects, we need to return a string here
            // this is so far only true of show.users, but we'll need a better solution
            if (Array.isArray(value)) {
                value = value.map(v => v.displayName).join(', ');
            }

            if (r === 'startTime' || r === 'endTime') {
                value = humanReadableTime(value);
            }

            return (
                <TableRowColumn key={i}>
                    <span>{String(value)}</span>
                </TableRowColumn>
            );
        });
    }

    render () {
        const { model, tableConfig } = this.props;
        const colSpan = model.fields ? Object.keys(model.fields).length : 0;

        return (
            <Table
                height={'300px'}
                fixedHeader={tableConfig.fixedHeader}
                fixedFooter={tableConfig.fixedFooter}
                selectable={tableConfig.selectable}
                multiSelectable={tableConfig.multiSelectable}
                onRowSelection={this.handleRowSelection}
            >
                <TableHeader
                    displaySelectAll={tableConfig.displaySelectAll}
                    adjustForCheckbox={tableConfig.adjustForCheckbox}
                    enableSelectAll={tableConfig.enableSelectAll}
                >
                    <TableRow>
                        <TableHeaderColumn colSpan={colSpan} style={{ textAlign: 'center' }}>
                            <h1
                                style={{ textTransform: 'capitalize' }}
                                className="table-heading"
                            >
                                {model.name}
                            </h1>
                            <TextField
                                hintText="Start typing to filter..."
                                onChange={this.debounceTextField}
                            />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        {model.fields && this.renderTableHeader()}
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={tableConfig.displayRowCheckbox}
                    deselectOnClickaway={tableConfig.deselectOnClickaway}
                    showRowHover={tableConfig.showRowHover}
                    stripedRows={tableConfig.stripedRows}
                >
                    {model.filteredResults.length && this.renderTableBody()}
                </TableBody>
            </Table>
        );
    }
}

MainTable.propTypes = {
    model: PropTypes.object,
    tableConfig: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(MainTable);
