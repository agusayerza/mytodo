import { Button, Modal } from "react-bootstrap";

export interface IDeleteModal {
    show: boolean,
    deleteText: string,
    deleteFunction: () => void,
    hide: () => void
}

export function DeleteModal(props: IDeleteModal) {

    return(<Modal show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "{props.deleteText}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Close</Button>
          <Button variant="primary" onClick= {() => {
            props.deleteFunction();
            props.hide();
          }}>Delete</Button>
        </Modal.Footer>
      </Modal>)
}