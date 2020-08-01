import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <input type = "text" placeholder = "First Name" />
                <br />
                <input type = "text" placeholder = "Last Name" />
                <br />
                <input type = "email" placeholder = "Purdue email" />
                <br />
                <input type = "password" placeholder = "Password" />
                <br />
                <button type = "submit">Sign Up</button>
            </form>
        )
    }
}

export default Register;