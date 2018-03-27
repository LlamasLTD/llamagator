import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {
    render() {
        return (
            <h1>Here I come to save the day</h1>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(
    mapStateToProps
)(App);