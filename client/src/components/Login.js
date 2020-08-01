import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <input type = "email" placeholder = "Purdue email" />
                <br />
                <input type = "password" placeholder = "Password" />
                <br />
                <button type = "submit">Log In</button>
            </form>
        )
    }
}

export default Login;