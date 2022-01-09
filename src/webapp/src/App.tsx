import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/todos';
import { Container, Navbar } from 'react-bootstrap';
import Header from './components/header';

function App() {
  return (
    <Fragment>
      <Header/>
      <Container className="mainBody">
        <Todos/>
      </Container>
    </Fragment>
  );
}

export default App;
