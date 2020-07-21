import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ClassComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1>Welcome to the Class</h1>
        )
    }
}

export default ClassComponent;