import { Button, Col, Form, Row } from "react-bootstrap"
import { ITodo } from "../../../types/todo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from "../../../config/store"
import { updateTodo } from "../../../reducers/todos"

export interface ITodoProps {
  todo: ITodo,
  delete: (id: number) => void,
  update: (id: number) => void
}

function Todo(props: ITodoProps) {

  const dispatch = useAppDispatch()

  const toggle = () => {
    const t: ITodo = {
      ...props.todo,
      marked: !props.todo.marked
    }
    dispatch(updateTodo(t));
  }

  return (
    <Row className="todo">
      <Col md="10">
        <Form.Check 
        type="switch"
        id="custom-switch"
        checked={props.todo.marked}
        onChange={toggle}
        label={props.todo.description}
        />
    </Col>
    <Col md="2">
      <Button size="sm" variant="secondary" onClick={() => props.update(props.todo.id)}><FontAwesomeIcon icon={faPencilAlt} /></Button>
      <Button size="sm" variant="danger" onClick={() => props.delete(props.todo.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
    </Col>
    </Row>
  )
}

export default Todo