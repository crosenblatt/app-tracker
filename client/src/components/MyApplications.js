import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppTable from './AppTable.js'
import App from './App.js';

class MyApps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    componentDidMount() {
        fetch('/api/helloworld')
            .then(res => res.json())
            .then(data => {
                this.setState({message: data["message"]})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <h1>Welcome to Your Apps</h1>
                <AppTable userId = '1' />
            </div>
        )
    }
}

export default MyApps;