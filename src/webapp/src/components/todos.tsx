import { Fragment, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../config/store"
import { getTodos } from "../reducers/todos"
import Todo, { ITodoProps } from "./todo"

export interface ITodosProps {}

function Todos(props: ITodosProps) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [])
  const todos = useAppSelector(state => state.todo.entities)
  return (
    <Fragment>
      {todos.map(t => <Todo key={t.id} todo={t}/>)}
    </Fragment>
  )
}

export default Todos