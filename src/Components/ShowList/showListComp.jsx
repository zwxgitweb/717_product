import React, { Component } from 'react';

class ShowList extends Component {
    render () {
        let { categoryInfo } = this.props;
        return (
            <dl>
                <dt>
                    <span style={{background: categoryInfo.src}}>{categoryInfo.info.slice(0, 3)}</span>
                </dt>
                <dd>
                    <p>{categoryInfo.info}</p>
                </dd>
            </dl>
        )
    }
}

export default ShowList;