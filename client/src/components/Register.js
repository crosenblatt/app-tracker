import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    register = (event) => {
        event.preventDefault()
        if(this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.username === "" || this.state.password === "") {
            alert("Please fill in all fields.")
        } else {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.newUser(this.state.firstName, this.state.lastName, this.state.email, this.state.username, this.state.password))
            }).then(res => {
                if(res.ok) {
                    alert("Registration Successful!")
                    this.setState({
                        username: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        email: ""
                    })
                    const token = res.json()
                        .then(data => {
                            document.cookie = `token=${data}`
                        })
                } else {
                    alert("Something went wrong. Please try again.")
                }
            })
        }
    }

    newUser(firstName, lastName, email, username, password) {
        return {
            "username": username,
            "password": password,
            "email": email,
            "name": firstName + " " + lastName
        }
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form onSubmit = {this.register}>
                <label>
                    First Name:
                    <input 
                        name = "firstName"
                        type = "text"
                        value = {this.state.firstName}
                        onChange = {this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input 
                        name = "lastName"
                        type = "text"
                        value = {this.state.lastName}
                        onChange = {this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input 
                        name = "email"
                        type = "email"
                        value = {this.state.email}
                        onChange = {this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input 
                        name = "username"
                        type = "text"
                        value = {this.state.username}
                        onChange = {this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        name = "password"
                        type = "password"
                        value = {this.state.password}
                        onChange = {this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <input type = "submit" />
            </form>
        )
    }
}

export default Register;