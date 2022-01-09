import { Fragment, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../config/store"
import { deleteTodo, getTodo, getTodos } from "../reducers/todos"
import Todo, { ITodoProps } from "./todo"
import {Button, Card, Modal} from "react-bootstrap"
import { DeleteModal } from "./modals/deleteModal"
import { TodoForm } from "./todoForm"
import { UpdateTodoModal } from "./modals/updateModal"
export interface ITodosProps {}

function Todos(props: ITodosProps) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, []);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const todos = useAppSelector(state => state.todo.entities);
  const todo = useAppSelector(state => state.todo.entity);
  
  const tryDeleteTodo = (id: number) => {
    dispatch(getTodo(id))
    setShowDelete(true)
  }

  const updateTodo = (id: number) => {
    dispatch(getTodo(id))
    setShowUpdate(true)
  }

  const doDelete = () => {
    dispatch(deleteTodo(todo.id));
  }

  return (
    <Fragment>
      <DeleteModal show={showDelete} deleteText={todo.description ? todo.description : ""} deleteFunction={doDelete} hide={() => setShowDelete(false)}/>
      <UpdateTodoModal todo={todo} show={showUpdate} hide={() => setShowUpdate(false)} />
      <Card>
        <Card.Body>
          <Card.Title>To-Do</Card.Title>
          {todos.map(t => <Todo key={t.id} todo={t} delete={tryDeleteTodo} update={updateTodo}/>)}
        </Card.Body>
        <Card.Footer>
          <TodoForm />
        </Card.Footer>
      </Card>
    </Fragment>
  )
}

export default Todos

