import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import { Modal } from 'react-bootstrap';
import './Card.css';

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

export default function NewCard({data}) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const bull = <span className={classes.bullet}>•</span>;



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
          {data.headline}
        </Typography>
        <Typography variant="body2" component="p">
          {'"Person_name 1"'}
          <br />
          {'"Person_name 2"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{color:'#368f8b'}} onClick={handleShow}>GOTO JOB</Button>
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
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
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
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
                  <h6>Field : ...........................</h6>
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
            <Button variant="contained" style={{ color:'#45A293' }}>
              Matched
            </Button>
            <Button variant="contained" style={{ color:"#F8395F" }}>
              Not Matched
            </Button>
            <Button variant="contained" style={{ color:'#E98E20' }}>
              Next
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </CardActions>
    </Card>
  );
}
