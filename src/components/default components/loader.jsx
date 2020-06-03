import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="lds-default" style={{ display: this.props.loading ? 'block' : 'none' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
}
