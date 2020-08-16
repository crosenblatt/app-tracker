import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie'

class AppForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: "",
            lastUpdated: new Date(),
            stage: "",
            resume: "",
            recruiter: "",
            recruiterEmail: "",
            error: "",
            applicationId: "",
        }
    
        if(this.props.location.state != undefined) {
            console.log("App ID: " + this.props.location.state["applicationId"])
            this.state["applicationId"] = this.props.location.state["applicationId"]
            console.log(this.state)
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDateInputChange = this.handleDateInputChange.bind(this)
        this.updateApp = this.updateApp.bind(this)
    }

    componentDidMount() {
        if(this.state.applicationId != "") {
            fetch('/api/apps/' + this.state.applicationId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            }).then(res => { 
                if(res.ok) {
                    res.json()
                    .then(data => {
                        data.map((row) => {
                            console.log(row)
                            this.setState({
                                companyName: row["company_name"],
                                lastUpdated: new Date(row["last_updated"]),
                                stage: row["stage"],
                                resume: "resume",
                                recruiter: row["recruiter"],
                                recruiterEmail: row["recruiter_email"]
                            })
                        })
                    })
                }
            })
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

    handleDateInputChange = date => {
        this.setState({
            lastUpdated: date
        })
    }

    submitApp = (event) => {
        event.preventDefault()
        if(this.state.companyName === "" || this.state.lastUpdated === "" || this.state.stage === "" || this.state.resume === "" || this.state.recruiter === "" || this.state.recruiterEmail === "") {
            alert("All fields must be filled out before submission")
        } else {
            fetch('/api/apps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(this.newData(this.state.companyName, this.state.lastUpdated, this.state.stage, this.state.resume, this.state.recruiter, this.state.recruiterEmail, -1))
            }).then(res => {
                if(res.ok) {
                    alert(this.state.companyName + " Added")
                    this.setState({
                        companyName: "",
                        lastUpdated: new Date(),
                        stage: "",
                        resume: "",
                        recruiter: "",
                        recruiterEmail: ""
                    })
                } else {
                    // console.log(res)
                    alert("Failed to add application")
                }
            })
        }
    }

    updateApp = (event) => {
        event.preventDefault()
        if(this.state.companyName === "" || this.state.lastUpdated === "" || this.state.stage === "" || this.state.resume === "" || this.state.recruiter === "" || this.state.recruiterEmail === "") {
            alert("All fields must be filled out before submission")
        } else if(this.state.applicationId === "") {
            alert("No application specified to update")
        } else {
            fetch('/api/apps/' + this.state.applicationId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(this.newData(this.state.companyName, this.state.lastUpdated, this.state.stage, this.state.resume, this.state.recruiter, this.state.recruiterEmail, this.state.applicationId))
            }).then(res => {
                if(res.ok) {
                    alert(this.state.companyName + " Updated")
                    this.setState({
                        companyName: "",
                        lastUpdated: new Date(),
                        stage: "",
                        resume: "",
                        recruiter: "",
                        recruiterEmail: "",
                        applicationId: ""
                    })
                } else {
                    alert("Failed to update application")
                }
            })
        }
    }

    newData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail, applicationId) {
        return {
            "company_name": companyName,
            "last_updated": lastUpdated,
            "stage": stage,
            "resume": resume,
            "recruiter": recruiter,
            "recruiter_email": recruiterEmail,
            "application_id" : applicationId
        }
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.submitApp}>
                    <label>
                        Job Name:
                        <input 
                            name = "companyName"
                            type = "text"
                            value = {this.state.companyName}
                            onChange = {this.handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Last Updated:
                        <DatePicker 
                            selected = {this.state.lastUpdated}
                            onChange = {this.handleDateInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Stage:
                        <input
                            name = "stage"
                            type = "text"
                            value = {this.state.stage}
                            onChange = {this.handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Resume
                        <input 
                            name = "resume"
                            type = "text"
                            value = {this.state.resume}
                            onChange = {this.handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Recruiter
                        <input
                            name = "recruiter"                   
                            type = "text"
                            value = {this.state.recruiter}
                            onChange = {this.handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Recruiter Email
                        <input
                            name = "recruiterEmail"
                            type = "text"
                            value = {this.state.recruiterEmail}
                            onChange = {this.handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <input type = "submit"/>
                    <button onClick = {this.updateApp} disabled = {this.state.applicationId === ""}>Update</button>
                </form>
            </div>
        )
    }
}

export default AppForm;