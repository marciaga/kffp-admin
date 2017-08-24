/**
 * TODO @ma - this component is deprecated because spotify's API changed
 * and there's no suitable replacement as of June 1, 2017
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionSearch from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import { searchInput, searchForm } from '../../actions/searchActions';

const mapStateToProps = state => ({
    search: state.search
});

const searchIconStyles = {
    position: 'relative',
    top: '10px',
    height: '30px',
    width: '30px',
    color: 'rgba(0, 0, 0, 0.298039)'
};

export class Search extends Component {
    constructor (props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.props.dispatch(searchInput(e.target.value));
    }

    handleSubmit (e) {
        const { currentSearch } = this.props.search;

        e.preventDefault();
        this.props.dispatch(searchForm(currentSearch));
    }

    render () {
        const { currentSearch } = this.props.search;
        const errorMessage = false;

        return (
            <div className="col col-md-12 search-form flex-horizontal-center">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <ActionSearch style={searchIconStyles} className="search-icon" />
                        <TextField
                            onChange={this.handleChange}
                            value={currentSearch}
                            floatingLabelText={'Enter a search and press enter'}
                            hintText={'Enter a search and press enter'}
                        />
                    </div>
                </form>

                {errorMessage &&
                    <p>{errorMessage}</p>
                }
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentSearch: PropTypes.string,
    search: PropTypes.object
};

export default connect(mapStateToProps)(Search);
