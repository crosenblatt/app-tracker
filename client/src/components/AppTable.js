import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

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
            rows: [],
        }
        this.classes = props.classes
        this.addData = this.addData.bind(this)
    }

    componentDidMount() {
        fetch('/api/apps', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + Cookies.get('token')
            }
        }).then(res => res.json())
            .then(data => {
                data.map((row) => {
                    this.addData(row["company_name"], row["last_updated"], row["stage"], "resume", row["recruiter"], row["recruiter_email"], row["application_id"])
                })
            })
        }

    createData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail, applicationId) {
        return { companyName, lastUpdated, stage, resume, recruiter, recruiterEmail, applicationId }
    }

    addData = (companyName, lastUpdated, stage, resume, recruiter, recruiterEmail, applicationId) => {
        this.setState((prevState, props) =>{
            const newRow = this.createData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail, applicationId)
            return { userId: prevState.userId, rows: [...prevState.rows, newRow] }
        })
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
                                <Cell align = "right">Edit</Cell>
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
                                    <Cell align = "right">
                                        <Link to = {{ 
                                            pathname: "/appForm",
                                            state: { applicationId: row.applicationId }
                                        }} >Edit this Application</Link>
                                    </Cell>
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