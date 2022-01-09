import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { updateTodo } from "../../reducers/todos";
import { ITodo } from "../../types/todo";
import { withLoader } from "../loader";
import { TodoForm } from "../todoForm";

export interface IUpdateTodoModal {
    todo: ITodo,
    show: boolean,
    hide: () => void
}

export function UpdateTodoModal(props: IUpdateTodoModal) {

    const loading = useAppSelector(state => state.todo.loading)
    const formRef = useRef<any>()

    return withLoader(loading, <Modal show={props.show} onHide={props.hide}>
<Modal.Header closeButton>
  <Modal.Title>Update To-Do</Modal.Title>
</Modal.Header>
<Modal.Body>
  <TodoForm todo={props.todo} ref={formRef}/>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={props.hide}>Close</Button>
  <Button variant="primary" onClick= {() => {
    if(formRef.current?.doSubmit()) {
        props.hide();
    }
  }}>Update</Button>
</Modal.Footer>
</Modal>
    )
        
}