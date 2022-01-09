import { Button, Col, Form, Row } from "react-bootstrap"
import { ITodo } from "../types/todo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export interface ITodoProps {
  todo: ITodo
}

function Todo(props: ITodoProps) {
  return (
    <Row className="todo">
      <Col md="10">
        <Form.Check 
        type="switch"
        id="custom-switch"
        label={props.todo.description}
        />
    </Col>
    <Col md="2">
      <Button variant="secondary"><FontAwesomeIcon icon={faPencilAlt} /></Button>
      <Button variant="danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
    </Col>
    </Row>
  )
}

export default Todo