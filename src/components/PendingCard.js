import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import { Modal } from 'react-bootstrap';
import './Card.css';
import InformationModal from './InformationModal';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    margin: 20,
    borderColor: '#8c2f39',
    backgroundColor: '#FEF7F8',
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

class PendingCard extends React.Component {

  isMatched = () => {
    console.log("inside pending card matched");
    console.log("id: ", this.props.data.id);
    var jobId = this.props.data.id;

    axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=MATCH`)
    .then((response) => {
      console.log("in matched post success: ", response);
      var index = -1;

      for (let i = 0; i < this.props.pendingJobsList.length; i++){
        if (jobId === this.props.pendingJobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.pendingJobsList.splice(index, 1);
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

      for (let i = 0; i < this.props.pendingJobsList.length; i++){
        if (jobId === this.props.pendingJobsList[i].id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        console.log("index found: ", index);
        this.props.pendingJobsList.splice(index, 1);
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

    this.props.displayNextItem();
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
          <Typography className={classes.title} color="#8c2f39" gutterBottom style={{color:'#8c2f39'}}>
            <AccessTimeOutlinedIcon fontSize='small' style={{ color: '#8c2f39' }}/> Pending
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
          <Button size="small" style={{color:'#8c2f39'}} onClick={handleShow}>GOTO JOB</Button>
          <InformationModal show={show} 
                          setShow={this.props.setShow}
                          isMatched={this.isMatched}
                          isNotMatched={this.isNotMatched}
                          isPending={this.isPending} 
                          isClosing={this.isClosing}
                          data={this.props.data}
                          displayBool={this.props.displayBool} 
                          key={this.props.data.id} />
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

  console.log("show: ", show);

  return (
      <PendingCard data={data} jobsList={jobsList} newJobsList={newJobsList} pendingJobsList={pendingJobsList}
      handleListChange={handleListChange} displayNextItem={displayNextItem} displayBool={displayBool} setShow={setShow} classes={classes} show={show} handleShow={handleShow} handleClose={handleClose} bull={bull}/>
  )
}
