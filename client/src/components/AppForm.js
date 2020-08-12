import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    }

    componentDidMount() {
        if(this.state.applicationId != "") {
            console.log("fetching")
            fetch('/api/apps/' + this.state.applicationId)
                .then(res => res.json())
                .then(data => {
                    data.map((row) => {
                        console.log(row)
                        this.setState({
                            companyName: row["company_name"],
                            lastUpdated: row["last_updated"],
                            stage: row["stage"],
                            resume: "resume",
                            recruiter: row["recruiter"],
                            recruiterEmail: row["recruiter_email"]
                        })
                    })
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
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.newData(this.state.companyName, this.state.lastUpdated, this.state.stage, this.state.resume, this.state.recruiter, this.state.recruiterEmail))
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

    newData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail) {
        return {
            "company_name": companyName,
            "last_updated": lastUpdated,
            "stage": stage,
            "resume": resume,
            "recruiter": recruiter,
            "recruiter_email": recruiterEmail
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
                        />
                    </label>
                    <br />
                    <input type = "submit"/>
                </form>
            </div>
        )
    }
}

export default AppForm;