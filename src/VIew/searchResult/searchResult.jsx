import React, { Component } from 'react';

class SearchResult extends Component {
    render () {
        let searchInfo = this.props.location.state.value;
        return (
            <div>
                {searchInfo}
            </div>
        )
    }
}

export default SearchResult;