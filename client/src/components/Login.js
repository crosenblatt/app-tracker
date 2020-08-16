import React from 'react';
import history from '../context/history.js'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    login = (event) => {
        event.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.user(this.state.username, this.state.password))
        }).then(res => {
            if(res.ok) {
                const token = res.json()
                    .then(data => {
                        document.cookie = `token=${data}`
                        this.props.history.push("/apps")
                    })
                
            } else {
                alert("Login failed")
            }
        })
    }

    handleInputChange(event) {
        event.preventDefault()
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    user(username, password) {
        return {
            "username": username,
            "password": password
        }
    }

    render() {
        return (
            <form onSubmit = {this.login}>
                <input name = "username" type = "text" placeholder = "Username" value = {this.state.username} onChange = {this.handleInputChange}/>
                <br />
                <input name = "password" type = "password" placeholder = "Password" value = {this.state.password} onChange = {this.handleInputChange} />
                <br />
                <button type = "submit">Log In</button>
            </form>
        )
    }
}

export default Login;