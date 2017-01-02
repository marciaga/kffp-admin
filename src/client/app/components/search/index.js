import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { searchInput, searchForm } from '../../actions/searchActions';

const mapStateToProps = (state) => {
    return {
        search: state.search
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
        const { currentSearch } = this.props.search;

        e.preventDefault();
        this.props.dispatch(searchForm(currentSearch));
    }

    render () {
        const { currentSearch } = this.props.search;
        const errorMessage = false;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            onChange={this.handleChange}
                            value={currentSearch}
                            floatingLabelText={'Enter a search query'}
                            hintText={'Enter a search query'}
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
    search: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Search);
