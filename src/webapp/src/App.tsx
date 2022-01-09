import { Fragment } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import {
  Route,
  Switch,
} from "react-router-dom";
import Folders from './components/entities/folder/folders';
import Todos from './components/entities/todo/todos';

function App() {
  return (
    <Fragment>
      <Header/>
      <Container className="mainBody">
        <Switch>
          <Route path="/folder/:folderId">
            <Todos />
          </Route>
          <Route path="/">
            <Folders />
          </Route>
        </Switch>
      </Container>
    </Fragment>

  );
}

export default App;
