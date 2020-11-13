import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import { Modal } from 'react-bootstrap';
import './Card.css';
import App from '../App';
import InformationModal from './InformationModal';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    margin: 20,
    borderColor: '#368f8b',
    backgroundColor: '#FBFCFB',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


class NewCard extends React.Component{
  
  isMatched = () => {
    console.log("inside new card matched");
    console.log("id: ", this.props.data.id);
    var jobId = this.props.data.id;

    axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=MATCH`)
    .then((response) => {
      console.log("in matched post success: ", response);
      var index = -1;

      for (let i = 0; i < this.props.newJobsList.length; i++){
        if (jobId === this.props.newJobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.newJobsList.splice(index, 1);
      }

      index = -1;

      for (let i = 0; i < this.props.jobsList.length; i++){
        if (jobId === this.props.jobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.jobsList.splice(index, 1);
      }


      this.props.handleListChange(this.props.newJobsList, this.props.pendingJobsList, this.props.jobsList);
      this.props.displayNextItem();
      //this.props.handleClose();
      //window.location.reload();
    }, (error) => {
      console.log("in matched post error: ", error);
      this.props.handleClose();
      window.location.reload(); 
    });
  }

  isNotMatched = () => {
    console.log("inside not matched");
    console.log("id: ", this.props.data.id);

    var jobId = this.props.data.id;
    axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=NO_MATCH`)
    .then((response) => {
      console.log("in no_match post success: ", response);
      var index = -1;

      for (let i = 0; i < this.props.newJobsList.length; i++){
        if (jobId === this.props.newJobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.newJobsList.splice(index, 1);
      }

      index = -1;

      for (let i = 0; i < this.props.jobsList.length; i++){
        if (jobId === this.props.jobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.jobsList.splice(index, 1);
      }

      this.props.handleListChange(this.props.newJobsList, this.props.pendingJobsList, this.props.jobsList);
      this.props.displayNextItem();
      //this.props.handleClose();
      //window.location.reload(); 
    }, (error) => {
      console.log("in no_match post error: ", error);
      this.props.handleClose();
      window.location.reload(); 
    });
  }

  isPending = () => {
    console.log("inside pending");
    console.log("id: ", this.props.data.id);

    var jobId = this.props.data.id;
    axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=WAIT`)
    .then((response) => {
      console.log("in PENDING post success: ", response);

      var index = -1;
      var pendingJob;

      for (let i = 0; i < this.props.newJobsList.length; i++){
        if (jobId === this.props.newJobsList[i].id){
          index = i;
          pendingJob = this.props.newJobsList[i];
          break;
        }
      }

      if (index > -1) {
        console.log("index found: ", index);
        this.props.newJobsList.splice(index, 1);
        this.props.pendingJobsList.push(pendingJob);
      }
      this.props.handleListChange(this.props.newJobsList, this.props.pendingJobsList, this.props.jobsList);
      this.props.displayNextItem();
      //this.props.handleClose();
      //window.location.reload(); 
    }, (error) => {
      console.log("in PENDING post error: ", error);
      this.props.handleClose();
      window.location.reload();
    });
  }

  isClosing = () => {
    this.props.handleClose();
    window.location.reload();
  }


  render(){
  const classes = this.props.classes;
  const show = this.props.show;
  const handleShow = this.props.handleShow;
  //const handleClose = this.props.handleClose;
  const bull = this.props.bull;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="#368f8b" gutterBottom style={{color:'#368f8b'}}>
          <NewReleasesOutlinedIcon fontSize='small' style={{ color: '#368f8b' }}/> New
        </Typography>
        <Typography variant="h5" component="h2">
          Job{bull}Title
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        </Typography>
        <Typography variant="body2" component="p">
          { '"' + this.props.data.firstPerson.firstName + '"' }
          <br />
          { '"' + this.props.data.secondPerson.firstName + '"' }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{color:'#368f8b'}} onClick={handleShow}>GOTO JOB</Button>
        <InformationModal show={show} 
                          setShow={this.props.setShow}
                          isMatched={this.isMatched}
                          isNotMatched={this.isNotMatched}
                          isPending={this.isPending}
                          isClosing={this.isClosing}
                          data={this.props.data}
                          displayBool={this.props.displayBool} 
                          key={this.props.data.id} />
        {/*
        <Modal show={show} onHide={handleClose} dialogClassName="your-dialog-classname">
          <Modal.Header bsPrefix="no-border">
            <Modal.Title> </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div class="first-column">
              <div class="divBox">
                <div class="divContent">

                  <h5>Personal Information</h5>
                  <br/>
                  <h6><b>First Name:</b> { this.props.data.firstPerson.firstName }</h6>
                  <h6><b>Second Name:</b> { this.props.data.firstPerson.lastName }</h6>
                  <h6><b>Date of Birth:</b> { this.props.data.firstPerson.date_of_birth }</h6>
                  <h6><b>Phone No:</b> { this.props.data.firstPerson.number }</h6>
                  <h6><b>Address:</b> { this.props.data.firstPerson.address }</h6>
                  <br/><br/><br/>
                  <h5>Bio Information</h5>
                  <br/>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>

                </div>
              </div>
            </div>

            <div class="second-column">
              <div class="divBox">
                <div class="divContent">

                  <h5>Personal Information</h5>
                  <br/>
                  <h6><b>First Name:</b> { this.props.data.secondPerson.firstName }</h6>
                  <h6><b>Second Name:</b> { this.props.data.secondPerson.lastName }</h6>
                  <h6><b>Date of Birth:</b> { this.props.data.secondPerson.date_of_birth }</h6>
                  <h6><b>Phone No:</b> { this.props.data.secondPerson.number }</h6>
                  <h6><b>Address:</b> { this.props.data.secondPerson.address }</h6>
                  <br/><br/><br/>
                  <h5>Bio Information</h5>
                  <br/>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>

                </div>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" style={{ color:'#E98E20' }}>
              Previous
            </Button>
            <Button variant="contained" style={{ color:'#45A293' }} onClick={this.isMatched}>
              Matched
            </Button>
            <Button variant="contained" style={{ color:"#F8395F" }} onClick={this.isNotMatched}>
              Not Matched
            </Button>
            <Button variant="contained" style={{ color:'#E98E20' }} onClick={this.isPending}>
              Next
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        */}
      </CardActions>
    </Card>
  );
  }
}


export default ({data, jobsList, newJobsList, pendingJobsList, handleListChange, displayNextItem, displayBool}) => {
  const classes = useStyles();
  const [show, setShow] = useState(displayBool);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <NewCard data={data} jobsList={jobsList} newJobsList={newJobsList} pendingJobsList={pendingJobsList}
      handleListChange={handleListChange} displayNextItem={displayNextItem} displayBool={displayBool} setShow={setShow} classes={classes} show={show} handleShow={handleShow} handleClose={handleClose} bull={bull}/>
  )
}