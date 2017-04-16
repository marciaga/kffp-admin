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
import TableConfig from './tableConfig';
import { setUpdateFormData } from '../../actions/formActions';
import { showOrHideModal } from '../../actions/modalActions';

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
            const rowData = this.props.model.data[rowIndex];

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
        const tableData = this.sortDisplayData(model.data);

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
            const value = item[r];

            return (
                <TableRowColumn key={i}>
                    <span>{value}</span>
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
                            <h1 className="">{model.name}</h1>
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
                    {model.data && this.renderTableBody()}
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
