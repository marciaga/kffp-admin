import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { searchInput, searchForm } from '../actions/searchActions';

const mapStateToProps = (state) => {
    return {
        currentSearch: state.search.currentSearch
    };
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
        const { currentSearch } = this.props;
        e.preventDefault();
        this.props.dispatch(searchForm(currentSearch));
    }

    render () {
        const { currentSearch } = this.props;
        const errorMessage = false;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='mdl-textfield mdl-js-textfield'>
                        <input type='text' value={currentSearch} onChange={this.handleChange} className='mdl-textfield__input' id='search-input'/>
                        <label className='mdl-textfield__label' htmlFor='search-input'>Enter Search Query</label>
                    </div>
                    <button type='submit' className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Search</button>
                </form>

                {errorMessage &&
                  <p>{errorMessage}</p>
                }
            </div>
        );
    }
}

Search.propTypes = {
    search: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Search);
