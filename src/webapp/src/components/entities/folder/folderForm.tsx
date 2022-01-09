import React, { ChangeEvent, useImperativeHandle, forwardRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createFolder, updateFolder } from "../../../reducers/folder";
import { useAppDispatch } from "../../../config/store";
import { IFolder } from "../../../types/folder";

export interface IFolderFormProps {
    folder?: IFolder
}

export const FolderForm = forwardRef((props: IFolderFormProps, ref: any) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>(props.folder ? props.folder.name : "")
    const [isValid, setValid] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
        doSubmit() {
            if(valid()) {
                commitSubmit();
            }
            return valid();
        }
    }));

    const valid = () => {
        if(name.length > 128 || name.length <= 0) {
            setValid(false);
            return false;
        }
        setValid(true);
        return true;
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!valid()) {
            e.stopPropagation();
            return;
        }
        commitSubmit();
    }

    const commitSubmit = () => {
        if(props.folder) {
            dispatch(updateFolder({
                ...props.folder,
                name: name,
            }))
        } else {
            dispatch(createFolder({
                id: -1,
                name: name
            }))
        }
        setName("");
    }
   return (<Form onSubmit={submit}>
    <Form.Group className="mb-3">
        <Form.Label>{props.folder ? "Update" : "Create"} folder:</Form.Label>
        <Row>
            <Col md={props.folder ? "12" : "11"}>
                <Form.Control isInvalid={!isValid} type="text" placeholder="Name ..." value={name} onChange={(e: ChangeEvent<any>) => {setName(e.target.value)}}/>
                <Form.Control.Feedback type="invalid">
                    Cannot be empty or longer than 128 characters.
                </Form.Control.Feedback>
            </Col>
            <Col md="1" style={{display: props.folder ? "none" : "block"}}>
                <Button onClick={submit}>Add</Button>
            </Col>
        </Row>
    </Form.Group>
  </Form>)
})