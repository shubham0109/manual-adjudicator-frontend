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


class InformationModal extends React.Component{
        
      /*isMatched = () => {
        console.log("inside matched");
        console.log("id: ", this.props.data.id);
    
        axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=MATCH`)
        .then((response) => {
          console.log("in matched post success: ", response);
          this.props.handleClose();
          window.location.reload(); 
        }, (error) => {
          console.log("in matched post error: ", error);
          this.props.handleClose();
          window.location.reload(); 
        });
      }
    
      isNotMatched = () => {
        console.log("inside not matched");
        console.log("id: ", this.props.data.id);
    
        axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=NO_MATCH`)
        .then((response) => {
          console.log("in no_match post success: ", response);
          this.props.handleClose();
          window.location.reload(); 
        }, (error) => {
          console.log("in no_match post error: ", error);
          this.props.handleClose();
          window.location.reload(); 
        });
      }
    
      isPending = () => {
        console.log("inside pending");
        console.log("id: ", this.props.data.id);
    
        axios.post(`http://localhost:8080/api/job/update?id=${this.props.data.id}&status=WAIT`)
        .then((response) => {
          console.log("in PENDING post success: ", response);
          this.props.handleClose();
          window.location.reload(); 
        }, (error) => {
          console.log("in PENDING post error: ", error);
          this.props.handleClose();
          window.location.reload();
        });
      }*/

      render(){
        const classes = this.props.classes;
        const show = this.props.show;
        const handleShow = this.props.handleShow;
        const handleClose = this.props.handleClose;
        const bull = this.props.bull;
        console.log("fubar");

        return (
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
                    <Button variant="contained" style={{ color:'#E98E20' }} onClick={this.props.isPending}>
                    Previous
                    </Button>
                    <Button variant="contained" style={{ color:'#45A293' }} onClick={this.props.isMatched}>
                    Matched
                    </Button>
                    <Button variant="contained" style={{ color:"#F8395F" }} onClick={this.props.isNotMatched}>
                    Not Matched
                    </Button>
                    <Button variant="contained" style={{ color:'#E98E20' }} onClick={this.props.isPending}>
                    Next
                    </Button>
                    <Button variant="contained" onClick={this.props.isClosing}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
      }
}

export default ({data, show, setShow, isMatched, isNotMatched, isPending, displayBool, isClosing}) => {
    const classes = useStyles();
   // const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
        <InformationModal data={data} isMatched={isMatched} isNotMatched={isNotMatched} isPending={isPending} isClosing={isClosing}
        classes={classes} show={show} handleShow={handleShow} handleClose={handleClose} bull={bull}/>
    )
  }