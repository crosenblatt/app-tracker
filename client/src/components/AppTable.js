import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    table: {
        minWidth: 500
    }
})


class AppTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            userId: props.userId, 
            rows: []
                // this.createData('Sumo Logic', 'August 9', 'Onsite', 'Summer 2020', 'Kat Creamer', 'idk@sumologic.com'),
                // this.createData('iCims', 'August 5', 'Accepted', 'Summer 2019', 'Sara Palughi', 'idk@icims.com'),
                // this.createData('Microsoft', 'July 4', 'Rejected', 'Fall 2019', 'Melissa Fackelmann', 'melissa@microsoft.com'),
                // this.createData('blah', 'blah', 'blah', 'blah', 'blah', 'blah')] 
        }
        this.classes = props.classes
        this.addData = this.addData.bind(this)
    }

    componentDidMount() {
        fetch('/api/apps')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.map((row) => {
                    console.log(row)
                    this.addData(row["company_name"], row["last_updated"], row["stage"], "resume", row["recruiter"], row["recruiter_email"])
                })
            })
    }

    createData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail) {
        return { companyName, lastUpdated, stage, resume, recruiter, recruiterEmail }
    }

    addData = (companyName, lastUpdated, stage, resume, recruiter, recruiterEmail) => {
        this.setState((prevState, props) =>{
            const newRow = this.createData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail)
            return { userId: prevState.userId, rows: [...prevState.rows, newRow] }
        })
    }

    newApp = (companyName, lastUpdated, stage, resume, recruiter, recruiterEmail) => {
        fetch('/api/apps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.newData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail))
        }).then(res => {
            if(res.ok) {
                this.addData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail)
            } else {
                console.log(res)
                alert("Failed to add application")
            }
        })
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
        const Cell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);
        
        const Row = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
        }))(TableRow);

        return (
            <div>
                <Button variant = "contained" onClick = {() => this.newApp('hellopls', '08-10-2020', 'blah', 'blah', 'blah', 'blah')}>Add New Application</Button>
                <TableContainer component = {Paper}>
                    <Table className = {this.classes.table} aria-label = "Applications Table">
                        <TableHead>
                            <TableRow>
                                <Cell align = "right">Company Name</Cell>
                                <Cell align = "right">Stage</Cell>
                                <Cell align = "right">Resume</Cell>
                                <Cell align = "right">Recruiter</Cell>
                                <Cell align = "right">Recruiter Email</Cell>
                                <Cell align = "right">Last Updated</Cell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row) => (
                                <Row key = {row.companyName}>
                                    <Cell component = "th" scope = "row">
                                        {row.companyName}
                                    </Cell>
                                    <Cell align = "right">{row.stage}</Cell>
                                    <Cell align = "right">{row.resume}</Cell>
                                    <Cell align = "right">{row.recruiter}</Cell>
                                    <Cell align = "right">{row.recruiterEmail}</Cell>
                                    <Cell align = "right">{row.lastUpdated}</Cell>
                                </Row>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withStyles(styles)(AppTable);