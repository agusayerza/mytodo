import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFolder } from "../../types/folder";
import { ITodo } from "../../types/todo";
import { FolderForm } from "../entities/folder/folderForm";
import { TodoForm } from "../entities/todo/todoForm";

export interface IUpdateTodoModal {
    todo: ITodo,
    show: boolean,
    hide: () => void
}

export function UpdateTodoModal(props: IUpdateTodoModal) {

    const formRef = useRef<any>()

    return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Update To-Do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TodoForm todo={props.todo} ref={formRef} afterSubmit={props.hide}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>Close</Button>
        <Button variant="primary" onClick= {() => formRef.current?.doSubmit()}>Update</Button>
      </Modal.Footer>
    </Modal>
    )   
}

export interface IUpdateFolderModal {
  folder: IFolder,
  show: boolean,
  hide: () => void
}

export function UpdateFolderModal(props: IUpdateFolderModal) {

  const formRef = useRef<any>()

  return (
  <Modal show={props.show} onHide={props.hide}>
    <Modal.Header closeButton>
      <Modal.Title>Update To-Do</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FolderForm folder={props.folder} ref={formRef} afterSubmit={props.hide}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.hide}>Close</Button>
      <Button variant="primary" onClick= {() => formRef.current?.doSubmit()}>Update</Button>
    </Modal.Footer>
  </Modal>
  )   
}