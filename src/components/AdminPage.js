import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

var CircularQueue = require('circular-queue');
var queue = new CircularQueue(100);

var jobsList = [
    {
        id: 1,
        status: "WAIT",
        firstPerson: {
            firstName: "Shubham",
            lastName: "Kumar",
            age: 24,
        },
        secondPerson: {
            firstName: "Sumit",
            lastName: "Rana",
            age: 25,
        },
        comments: [
            "this is first comment",
            "this is second comment",
        ],
        adjudicator: "adjudicator 1",
    },
    {
        id: 2,
        status: "WAIT",
        firstPerson: {
            firstName: "abc",
            lastName: "Kumar",
            age: 24,
        },
        secondPerson: {
            firstName: "xyz",
            lastName: "Rana",
            age: 25,
        },
        comments: [
            "this is first comment",
            "this is second comment",
        ],
        adjudicator: "adjudicator 2",
    },
    {
        id: 3,
        status: "WAIT",
        firstPerson: {
            firstName: "cristiano",
            lastName: "Kumar",
            age: 24,
        },
        secondPerson: {
            firstName: "martial",
            lastName: "Rana",
            age: 25,
        },
        comments: [
            "this is first comment",
            "this is second comment",
        ],
        adjudicator: "adjudicator 3",
    },
];

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

class AdminPage extends Component {

  state = {
    jobsList: [],
  }

  componentDidMount() {
    console.log("in admin mount");
    this.setState({
        jobsList: jobsList,
    });
  }

  render() {   
      //jobsList = this.state.jobsList;
      const classes = this.props.classes;
      console.log("jobs list in admin: ", jobsList);

      return (
        <>
            <ReactBootstrap.Container style={{marginTop:25}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Job Id </TableCell>
                        <TableCell align="right">Person 1</TableCell>
                        <TableCell align="right">Person 2</TableCell>
                        <TableCell align="right">Assigned Adjudicator</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {jobsList.map((job) => (
                        
                        <TableRow key={job.id}>
                        <TableCell component="th" scope="row">
                            {job.id}
                        </TableCell>
                        <TableCell align="right">{job.firstPerson.firstName}</TableCell>
                        <TableCell align="right">{job.secondPerson.firstName}</TableCell>
                        <TableCell align="right">{job.adjudicator}</TableCell>
                        <TableCell align="right">
                            <Button 
                                variant="contained" 
                                style={{ color:'#45A293', margin: 5 , marginBottom:15}} 
                                onClick={() => this.handleJob(job)}>
                            Reassign Job
                            </Button>
                        </TableCell>
                        </TableRow>
                        
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </ReactBootstrap.Container>
        </>
      )
  }
}

export default ({skippedJobsList, isSkippedMatched, isSkippedNotMatched, openSkippedJob}) => {
    const classes = useStyles();
    
    return (
        <AdminPage 
        classes={classes}/>
    )
  }
