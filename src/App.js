import React, { Component } from 'react';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';
import NavBar from './components/NavBar';
import NewCard from './components/NewCard';
import PendingCard from './components/PendingCard';

const data = {
  content: {
    body: [
      {
        _uid: "BUY6Drn9e1",
        component: "foo",
        headline: "Foo",
        status: "New"
      },
      {
        _uid: "gJZoSLkfZV",
        component: "bar",
        headline: "Bar",
        status: "New"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "New"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "Pending"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "Pending"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "Pending"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "Pending"
      },
      {
        _uid: "X1JAfdsZxy",
        component: "foo",
        headline: "Another headline",
        status: "Pending"
      }
    ]
  }
};

class App extends Component {
  render() {
    return (
    	<>
    		<div>
		        <NavBar />
		    </div>

		    
		    <ReactBootstrap.Container>
			  <ReactBootstrap.Row>
			  	{data.content.body.map(function(block){
			  		if (block.status === "New"){
			  			return <ReactBootstrap.Col md={3}><NewCard data={block} key={block} /></ReactBootstrap.Col>
			  		}else{
			  			return <ReactBootstrap.Col md={3}><PendingCard data={block} key={block} /></ReactBootstrap.Col>
			  		}
		        })}
			  </ReactBootstrap.Row>
			</ReactBootstrap.Container>
    	</>
    )
  }
}

export default App;
