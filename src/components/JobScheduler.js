import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import JobInformation from './JobInformation';
var CircularQueue = require('circular-queue');
var queue = new CircularQueue(100);

class JobScheduler extends Component {

   /* state = {
        jobQueue: queue,
    }

    componentDidUpdate() {
        console.log("inside component did mount");

        axios.get(`http://localhost:8080/api/job/user/1`)
          .then(res => {
            const jobs = res.data;
            console.log("jobs in here: ", jobs);
            //this.setState({ jobs });
    
            var jobQueue = new CircularQueue(100);
    
            const newJobs = [];
            const pendingJobs = [];
            jobs.map(function(job){
              if (job.status === "OPEN"){
                newJobs.push(job);
              }else if (job.status === "WAIT"){
                pendingJobs.push(job);
              }
    
              jobQueue.offer(job);
    
            });
    
            //this.setState({newJobs});
            //this.setState({pendingJobs});
            this.setState({jobQueue});
            //this.setState({rollingAllowed: false});
          });
    }*/

    render() {
        var jobQueue = this.props.jobQueue;
        var job = jobQueue.peek();
        console.log("jobQueue2: ", jobQueue);
        console.log("job2: ", job);

        return (
            <JobInformation 
            job={job} 
            jobQueue={jobQueue} 
            isMatched={this.props.isMatched} 
            isNotMatched={this.props.isNotMatched}
            isSkipped={this.props.isSkipped} />
        )
    }

}

export default JobScheduler;