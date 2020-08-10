import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    table: {
        minWidth: 500
    }
})


class AppTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { userId: props.userId }
        this.classes = props.classes
    }

    componentDidMount() {
    }

    createData(companyName, lastUpdated, stage, resume, recruiter, recruiterEmail) {
        return { companyName, lastUpdated, stage, resume, recruiter, recruiterEmail }
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

    
        const rows = [
            this.createData('Sumo Logic', 'August 9', 'Onsite', 'Summer 2020', 'Kat Creamer', 'idk@sumologic.com'),
            this.createData('iCims', 'August 5', 'Accepted', 'Summer 2019', 'Sara Palughi', 'idk@icims.com'),
            this.createData('Microsoft', 'July 4', 'Rejected', 'Fall 2019', 'Melissa Fackelmann', 'melissa@microsoft.com')
        ];

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
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