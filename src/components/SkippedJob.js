import React, { Component } from 'react';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import { Row, Col, Nav, Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Button from '@material-ui/core/Button';
import DisplayPdf from './DisplayPdf';
import DisplayPdfSingle from './DisplayPdfSingle';
import samplePDF from "./sampleone.pdf";
import samplePDF1 from "./sample.pdf";
import lion from "./lion.jpeg";
import tiger from "./tiger.jpeg";
import manDummy from "./man-dummy.jpg";
import womanDummy from "./woman-dummy.jpg";
//import "../style.css";
import { Document, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// footer CSS
const footerStyle = {
    backgroundColor: "#faf9f5",
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
};
  
const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
};

class SkippedJob extends Component {

    render() {
        console.log("job3: ", this.props.job);

        return (
            
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Personal Information</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">D.O.B certificate</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Passport</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth">Driving License</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                        <ReactBootstrap.Container>
                            <Form style={{ margin: 20 }}>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        
                                    </Form.Label>
                                    <Col sm="5">
                                        <Image style={{ margin: 50 }} src={manDummy} rounded thumbnail/>
                                    </Col>
                                    <Col sm="5"  md={4}>
                                        <Image style={{ margin: 50 }} src={manDummy} rounded thumbnail/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        First Name
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control readOnly value={this.props.job.firstPerson.firstName} />
                                    </Col>
                                    <Col sm="5">
                                    <   Form.Control readOnly value={this.props.job.secondPerson.firstName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Last Name
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control readOnly value={this.props.job.firstPerson.firstName} />
                                    </Col>
                                    <Col sm="5">
                                    <   Form.Control readOnly value={this.props.job.secondPerson.firstName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Date of Birth
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control readOnly value={this.props.job.firstPerson.firstName} />
                                    </Col>
                                    <Col sm="5">
                                    <   Form.Control readOnly value={this.props.job.secondPerson.firstName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Blood Group
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control readOnly value={this.props.job.firstPerson.firstName} />
                                    </Col>
                                    <Col sm="5">
                                    <   Form.Control readOnly value={this.props.job.secondPerson.firstName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Address
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control as="textarea" rows={3} readOnly value={this.props.job.firstPerson.firstName} />
                                    </Col>
                                    <Col sm="5">
                                        <Form.Control as="textarea" rows={3} readOnly value={this.props.job.secondPerson.firstName} />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <div style={{ margin: 10}}>
                                <div style={phantomStyle} />
                                <div style={footerStyle}>
                                <Button variant="contained" 
                                        style={{ color:"#F8395F", margin: 5 , marginBottom:15 }} 
                                        onClick={this.props.isSkippedNotMatched}>
                                    Not Matched
                                </Button>
                                <Button variant="contained" 
                                        style={{ color:'#45A293', margin: 5 , marginBottom:15}} 
                                        onClick={this.props.isSkippedMatched}>
                                    Matched
                                </Button>
                                <Button variant="contained" 
                                        style={{ color:'#E98E20', margin: 5 , marginBottom:15 }} 
                                        onClick={this.props.isSkippedClose}>
                                    Close
                                </Button>
                                </div>
                            </div>
                        </ReactBootstrap.Container>
                        </Tab.Pane>


                        <Tab.Pane eventKey="second">
                            <Row>
                            <Col sm="6" >
                                <DisplayPdf pdf={samplePDF} />
                            </Col>

                            <Col sm="6">
                                <DisplayPdf pdf={samplePDF} />
                            </Col>
                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                            <Row>
                            <Col sm="6">
                                <DisplayPdfSingle pdf={samplePDF1} />
                            </Col>

                            <Col sm="6">
                                <DisplayPdfSingle pdf={samplePDF1} />
                            </Col>
                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="fourth">
                            <Row>
                            <Col sm="6">
                                <DisplayPdf />
                            </Col>

                            <Col sm="6">
                                <DisplayPdf  />
                            </Col>
                            </Row>
                        </Tab.Pane>


                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            
        )

    }
}

export default SkippedJob;