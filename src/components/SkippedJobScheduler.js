import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import JobInformation from './JobInformation';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class SkippedJobScheduler extends Component {

    handleJob = (job) => {
        console.log("inside handle job: ", job);
        var createJob ={
            id: job[0],
            status: job[1],
            firstPerson: job[2],
            secondPerson: job[3],
        }

        this.props.openSkippedJob(createJob);
    }
    
    render() {
        const classes = this.props.classes;
        const skippedJobsList = this.props.skippedJobsList;
        console.log("skippedJobsList: ", skippedJobsList);
        var jobsList = [];
        
        for (let i = 0; i < skippedJobsList.length; i++){
            var objjob = Object.values(skippedJobsList[i]);
            console.log("objjob: ", objjob);
            jobsList.push(objjob);
        }

        console.log("jobslist: ", jobsList);

        return (
            <ReactBootstrap.Container style={{marginTop:25}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Job Id </TableCell>
                        <TableCell align="right">Person 1</TableCell>
                        <TableCell align="right">Person 2</TableCell>
                        <TableCell align="right">Comments</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {jobsList.map((job) => (
                         
                        <TableRow key={job[0]}>
                        <TableCell component="th" scope="row">
                            {job[0]}
                        </TableCell>
                        <TableCell align="right">{job[2].firstName}</TableCell>
                        <TableCell align="right">{job[3].firstName}</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">
                            <Button 
                                variant="contained" 
                                style={{ color:'#45A293', margin: 5 , marginBottom:15}} 
                                onClick={() => this.handleJob(job)}>
                            Goto Job
                            </Button>
                        </TableCell>
                        </TableRow>
                        
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </ReactBootstrap.Container>
        )
    }
}

export default ({skippedJobsList, isSkippedMatched, isSkippedNotMatched, openSkippedJob}) => {
    const classes = useStyles();
    
    return (
        <SkippedJobScheduler 
        skippedJobsList={skippedJobsList} 
        isSkippedMatched={isSkippedMatched}
        isSkippedNotMatched={isSkippedNotMatched}
        openSkippedJob={openSkippedJob}
        classes={classes}/>
    )
  }