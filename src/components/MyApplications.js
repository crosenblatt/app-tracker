import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class MyApps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/api/helloworld')
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
                <h2>Message: {this.state.message}</h2>
            </div>
        )
    }
}

export default MyApps;