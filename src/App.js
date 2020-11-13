import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';
import NavBar from './components/NavBar';
import NavbarFilter from './components/NavbarFilter';
import NewCard from './components/NewCard';
import PendingCard from './components/PendingCard';


class App extends Component {

  state = {
    jobs: [],
    newJobs: [],
    pendingJobs: [],
    rollingAllowed: false,
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/api/job/user/2`)
      .then(res => {
        const jobs = res.data;
        console.log("jobs: ", jobs);
        this.setState({ jobs });

        const newJobs = [];
        const pendingJobs = [];
        jobs.map(function(job){
          if (job.status === "OPEN"){
            newJobs.push(job);
          }else if (job.status === "WAIT"){
            pendingJobs.push(job);
          }
        });

        this.setState({newJobs});
        this.setState({pendingJobs});
        this.setState({rollingAllowed: false});
      });
  }

  handleListChange = (newJobsList, pendingJobsList, jobsList) => {
    this.setState({
      jobs: jobsList,
      newJobs: newJobsList,
      pendingJobs: pendingJobsList,
    });
  }

  displayNextItem = () => {

    this.setState({
      rollingAllowed: true,
    })
    
    /*
    var newJobsList = this.state.newJobs;
    var pendingJobsList = this.state.pendingJobs;

    if (pendingJobsList.length > 0){
      
      console.log("pending length: ", pendingJobsList.length)
      console.log("pendingJobsList: ", pendingJobsList);
      var idx = Math.floor(Math.random()*pendingJobsList.length);
      console.log("idx: ", idx);
      var job = pendingJobsList[idx];
      
      
      return (<PendingCard data={job} newJobsList={newJobsList}
      handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
      pendingJobsList={pendingJobsList} key={job.id} />);
      
    }else if (newJobsList.length > 0){

      console.log("new jobs list length: ", newJobsList.length)
      var idx = Math.floor(Math.random()*newJobsList.length);
      var job = newJobsList[idx];
      
      return (<NewCard data={job} newJobsList={newJobsList}
      handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
      pendingJobsList={pendingJobsList} key={job.id} />);

    }else{
      console.log("no length");
    }
    */

  }

  render() {
    var jobsList = this.state.jobs;
    var newJobsList = this.state.newJobs;
    var pendingJobsList = this.state.pendingJobs;

    if (this.state.rollingAllowed === true){
      var jobListLength = jobsList.length;

      var idx = Math.floor(Math.random()*jobListLength);
      var job = jobsList[idx];

      if (job.status === "OPEN"){
        return <NewCard data={job} jobsList={jobsList} newJobsList={newJobsList}
                handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
                pendingJobsList={pendingJobsList} key={job.id} />
      }else{
        return <PendingCard data={job} jobsList={jobsList} newJobsList={newJobsList} 
              handleListChange={this.handleListChange} displayBool={true} displayNextItem={this.displayNextItem}
              pendingJobsList={pendingJobsList} key={job.id} />
      }

    }else{
      return (
        <>
          <div>
              <NavBar />
          </div>
  
          <div>
              <NavbarFilter />
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
    
  }
}

export default App;
