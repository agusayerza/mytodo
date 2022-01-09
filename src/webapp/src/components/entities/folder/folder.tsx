import { Button, Col, Row } from "react-bootstrap"
import { IFolder } from "../../../types/folder"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

export interface IFolderProps {
  folder: IFolder,
  delete: (id: number) => void,
  update: (id: number) => void
}

function Folder(props: IFolderProps) {
    const history = useHistory();

    return (
        <Row className="folder">
            <Col md="10">
            <Button size="sm" variant="primary" onClick={() => history.push(`folder/${props.folder.id}`)}><FontAwesomeIcon icon={faEye} /></Button>
                {props.folder.name}
            </Col>
            <Col md="2">
                <Button size="sm" variant="secondary" onClick={() => props.update(props.folder.id)}><FontAwesomeIcon icon={faPencilAlt} /></Button>
                <Button size="sm" variant="danger" onClick={() => props.delete(props.folder.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </Col>
        </Row>
    )
}

export default Folder