import { Fragment, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../config/store"
import { deleteTodo, getTodo, getTodos } from "../../../reducers/todos"
import Todo from "./todo"
import {Button, Card} from "react-bootstrap"
import { DeleteModal } from "../../modals/deleteModal"
import { TodoForm } from "./todoForm"
import { UpdateTodoModal } from "../../modals/updateModal"
import { useParams } from "react-router-dom"
import { getFolder } from "../../../reducers/folder"
import { useHistory } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withLoader } from "../../loader"

export interface ITodosProps {}

function Todos(props: ITodosProps) {
  const history = useHistory();
  const dispatch = useAppDispatch()
  const folder = useAppSelector(state => state.folder.entity)
  const {folderId} = useParams<{folderId: string}>()

  useEffect(() => {
    dispatch(getFolder(folderId))
  }, []);

  useEffect(() => {
    if(folder.id) dispatch(getTodos())
  }, [folder]);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const todos = useAppSelector(state => state.todo.entities);
  const todo = useAppSelector(state => state.todo.entity);
  const loading = useAppSelector(state => state.todo.loading);

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
      <Card>
        <Card.Body>
          <Card.Title><Button size="sm" onClick={() => history.push("/folder")}><FontAwesomeIcon icon={faArrowLeft} /></Button>{"Folders > " + folder.name}</Card.Title>
          {withLoader(loading, <Fragment>
            <DeleteModal show={showDelete} deleteText={todo.description ? todo.description : ""} deleteFunction={doDelete} hide={() => setShowDelete(false)}/>
            <UpdateTodoModal todo={todo} show={showUpdate} hide={() => setShowUpdate(false)} />
            {todos.map(t => <Todo key={t.id} todo={t} delete={tryDeleteTodo} update={updateTodo}/>)}
            </Fragment>)}
        </Card.Body>
        <Card.Footer>
          <TodoForm />
        </Card.Footer>
      </Card>
    </Fragment>
  )
}

export default Todos

