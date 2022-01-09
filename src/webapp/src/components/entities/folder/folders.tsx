import { Fragment, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../config/store"
import { Card } from "react-bootstrap"
import { DeleteModal } from "../../modals/deleteModal"
import { deleteFolder, getFolder, getFolders } from "../../../reducers/folder"
import { UpdateFolderModal } from "../../modals/updateModal"
import Folder from "./folder"
import { FolderForm } from "./folderForm"
import { withLoader } from "../../loader"
export interface IFoldersProps {}

function Folders(props: IFoldersProps) {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFolders())
  }, []);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const folders = useAppSelector(state => state.folder.entities);
  const folder = useAppSelector(state => state.folder.entity);
  const loading = useAppSelector(state => state.folder.loading);

  const tryDeleteFolder = (id: number) => {
    dispatch(getFolder(id))
    setShowDelete(true)
  }

  const updateFolder = (id: number) => {
    dispatch(getFolder(id))
    setShowUpdate(true)
  }

  const doDelete = () => {
    dispatch(deleteFolder(folder.id));
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title><div style={{marginLeft: "45px"}}>Folders</div></Card.Title>
          {withLoader(loading, <Fragment>
            <DeleteModal show={showDelete} deleteText={folder.name ? folder.name : ""} deleteFunction={doDelete} hide={() => setShowDelete(false)}/>
            <UpdateFolderModal folder={folder} show={showUpdate} hide={() => setShowUpdate(false)} />
            {folders.map(f => <Folder key={f.id} folder={f} delete={tryDeleteFolder} update={updateFolder}/>)}
            </Fragment>)}
        </Card.Body>
        <Card.Footer>
          <FolderForm />
        </Card.Footer>
      </Card>
    </Fragment>
  )
}

export default Folders

