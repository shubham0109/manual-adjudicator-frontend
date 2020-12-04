import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';
import NavBar from './components/NavBar';
import NavbarFilter from './components/NavbarFilter';
import NewCard from './components/NewCard';
import PendingCard from './components/PendingCard';
import JobInformation from './components/JobInformation';
import Button from '@material-ui/core/Button';
import Dashboard from './components/Dashboard';
import JobScheduler from './components/JobScheduler';
import SkippedJobScheduler from './components/SkippedJobScheduler';
import SkippedJob from './components/SkippedJob';
import AdminPage from './components/AdminPage';

var CircularQueue = require('circular-queue');
var queue = new CircularQueue(100);

class App extends Component {

  
  state = {
    jobQueue: queue,
    skippedJobsList: [],
    conditional: false,
    skippedJob:{},
    openSkippedJobConditional: false,
    skippedJobsPageConditional: false,
  }

  componentDidMount() {
    var acc_tok = localStorage.getItem("react-token");
    var preferred_username = localStorage.getItem("preferred-username");
    console.log("preferred_username: ", preferred_username);
    console.log("access_token: ", acc_tok);

    axios.get(`http://localhost:8080/api/job/user/`,{
      params: {
        username: preferred_username,
      }
    })
      .then(res => {
        const jobs = res.data;
        console.log("jobs hh: ", jobs);

        var jobQueue = new CircularQueue(100);
        var skippedJobsList = [];

        const newJobs = [];
        const pendingJobs = [];
        jobs.map(function(job){
          if (job.status === "OPEN"){
            newJobs.push(job);
          }else if (job.status === "WAIT"){
            pendingJobs.push(job);
            skippedJobsList.push(job);
          }

          jobQueue.offer(job);

        });

        
        this.setState({jobQueue});
        this.setState({skippedJobsList});
        this.setState({conditional: false});
        console.log("jobsqueue0: ", jobQueue);
      });
  }


  isMatched = () => {
    console.log("in matched");
    
    //window.location.reload();
    var jobQueue = this.state.jobQueue; 
    var matchedJob = jobQueue.poll();

    axios.post(`http://localhost:8080/api/job/update?id=${matchedJob.id}&status=MATCH`)
    .then((response) => {
      
      this.setState({jobQueue});
      this.setState({conditional: true});
      
    }, (error) => {
      console.log("in matched post error: ", error);
    });
  }

  isNotMatched = () => {
    console.log("in not matched");
    
    //window.location.reload();
    var jobQueue = this.state.jobQueue; 
    var notMatchedJob = jobQueue.poll();

    axios.post(`http://localhost:8080/api/job/update?id=${notMatchedJob.id}&status=NO_MATCH`)
    .then((response) => {
      
      this.setState({jobQueue});
      this.setState({conditional: true});
      
    }, (error) => {
      console.log("in not matched post error: ", error);
    });
  }

  isSkipped = () => {
    console.log("in skipped");
    
    //window.location.reload();
    var jobQueue = this.state.jobQueue; 
    var isSkippedJob = jobQueue.poll();

    axios.post(`http://localhost:8080/api/job/update?id=${isSkippedJob.id}&status=WAIT`)
    .then((response) => {
      
      jobQueue.offer(isSkippedJob);
      this.setState({jobQueue});
      this.setState({conditional: true});
      
    }, (error) => {
      console.log("in not matched post error: ", error);
    });
  }

  isSkippedMatched = () => {
    
  }

  isSkippedNotMatched = () => {

  }

  isSkippedClose = () => {
    this.setState({
      openSkippedJobConditional: false,
      skippedJobsPageConditional: true,
    })
  }

  openSkippedJob = (job) => {
    console.log("job in open skipped: ", job);
    this.setState({
      openSkippedJobConditional: true,
      skippedJob: job,
    });
  }

  render() {
    var jobsList = this.state.jobs;
    var newJobsList = this.state.newJobs;
    var pendingJobsList = this.state.pendingJobs;
    var jobQueue = this.state.jobQueue;
    console.log("jobqueue1: ", jobQueue);
    
    if (this.state.openSkippedJobConditional === true){
      console.log("skippped: ", this.state.skippedJob);
      return (
        <>
          <NavBar />
          <SkippedJob
          job={this.state.skippedJob}
          isSkippedMatched={this.isSkippedMatched}
          isSkippedNotMatched={this.isSkippedNotMatched}
          isSkippedClose={this.isSkippedClose}
          />
        </>
      )
    }else if(this.state.skippedJobsPageConditional === true){
      return (
        <>
          <NavBar />
          <SkippedJobScheduler 
          skippedJobsList={this.state.skippedJobsList} 
          isSkippedMatched={this.isSkippedMatched}
          sSkippedNotMatched={this.isSkippedNotMatched}
          openSkippedJob={this.openSkippedJob} />
        </>
      )             
    }else if (this.state.conditional === false){
      console.log("in false")
      return (
        <>
          <Router>
            <div>
                <NavBar />
                <Switch>
                  <Route path='/' exact component={Dashboard}></Route>
                  <Route path='/jobs' exact render={props => {
                    return <JobScheduler 
                            jobQueue={this.state.jobQueue} 
                            isMatched={this.isMatched}
                            isNotMatched={this.isNotMatched}
                            isSkipped={this.isSkipped} />
                      }}>
                  </Route> 
                  <Route path='/skippedJobs' exact render={props => {
                    return <SkippedJobScheduler 
                            skippedJobsList={this.state.skippedJobsList} 
                            isSkippedMatched={this.isSkippedMatched}
                            isSkippedNotMatched={this.isSkippedNotMatched}
                            openSkippedJob={this.openSkippedJob} />
                      }}>
                  </Route>
                  <Route path='/admin' exact component={AdminPage}></Route>
                </Switch>
            </div>
          </Router>
        </>
      )
    }else{
      console.log("in true")
      return (
        <>
            <div>
                <NavBar />
                <JobScheduler 
                jobQueue={this.state.jobQueue} 
                isMatched={this.isMatched}
                isNotMatched={this.isNotMatched} 
                isSkipped={this.isSkipped} />
            </div>
  
        </>
      )
    }

    

    {/*

    if (this.state.rollingAllowed === true){
      console.log("here");
      var jobListLength = jobsList.length;

      var idx = Math.floor(Math.random()*jobListLength);
      var newJob = jobsList[idx];

      return (
        <>
          <div>
              <NavBar newJobs={this.state.newJobs} />
          </div>
  
          
          <ReactBootstrap.Container>
          <ReactBootstrap.Row>

          {this.state.newJobs.map(function(job){
            console.log("new jobs1");

            if (newJob.id !== job.id){
              return <ReactBootstrap.Col md={3}><NewCard data={job} jobsList={jobsList} newJobsList={newJobsList}
              handleListChange={this.handleListChange} displayBool={false} displayNextItem={this.displayNextItem}
              pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
            }
          }, this)}
          
          {this.state.pendingJobs.map(function(job){
            console.log("pending jobs1");

            if (newJob.id !== job.id){
              return <ReactBootstrap.Col md={3}><PendingCard data={job} jobsList={jobsList} newJobsList={newJobsList} 
              handleListChange={this.handleListChange} displayBool={false} displayNextItem={this.displayNextItem}
              pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
            }
          }, this)}

          {this.state.jobs.map(function(job){

            if (newJob.id === job.id){
              if (newJob.status === "OPEN"){
                return <ReactBootstrap.Col md={3}><NewCard data={job} jobsList={jobsList} newJobsList={newJobsList}
                handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
                pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
              }else{
                return <ReactBootstrap.Col md={3}><PendingCard data={job} jobsList={jobsList} newJobsList={newJobsList} 
                handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
                pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
              }
            }

          }, this)}
            
          </ReactBootstrap.Row>
          </ReactBootstrap.Container>

          
          
        </>
      )

    }else{
      return (
        <>
          <div>
              <NavBar newJobs={this.state.newJobs} />
          </div>
          
          
          <ReactBootstrap.Container>
          <ReactBootstrap.Row>
            {this.state.newJobs.map(function(job){
              console.log("new jobs");
              return <ReactBootstrap.Col md={3}><NewCard data={job} jobsList={jobsList} newJobsList={newJobsList}
                handleListChange={this.handleListChange} displayBool={false} displayNextItem={this.displayNextItem}
                pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
            }, this)}
            
            {this.state.pendingJobs.map(function(job){
              console.log("pending jobs");
              return <ReactBootstrap.Col md={3}><PendingCard data={job} jobsList={jobsList} newJobsList={newJobsList} 
              handleListChange={this.handleListChange} displayBool={false} displayNextItem={this.displayNextItem}
              pendingJobsList={pendingJobsList} key={job.id} /></ReactBootstrap.Col>
            }, this)}
          </ReactBootstrap.Row>
        </ReactBootstrap.Container>
        </>
      )
    }
  */}
    
  }
}

export default App;
