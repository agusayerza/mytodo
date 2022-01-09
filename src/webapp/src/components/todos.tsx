import { Fragment, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../config/store"
import { getTodos } from "../reducers/todos"
import Todo, { ITodoProps } from "./todo"
import {Card} from "react-bootstrap"
export interface ITodosProps {}

function Todos(props: ITodosProps) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [])
  const todos = useAppSelector(state => state.todo.entities)
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>To-Do</Card.Title>
          {todos.map(t => <Todo key={t.id} todo={t}/>)}
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default Todos