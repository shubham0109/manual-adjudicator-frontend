import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {

    render(){
        return (
            <>
            <ReactBootstrap.Container>
                <ReactBootstrap.Row>
                    <Button variant="contained" style={{ color:'green', marginTop:150, marginLeft:500 }}>
                        <Link to='/jobs'>Start adjudication</Link>
                    </Button>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <Button variant="contained" style={{ color:'red', marginTop:15, marginLeft:500 }}>
                        <Link to='/skippedJobs'>Goto Pending Jobs</Link>
                    </Button>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            </>
        )
    }
}

export default Dashboard;