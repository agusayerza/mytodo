import React, { ChangeEvent, useImperativeHandle, forwardRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../config/store";
import { createTodo, updateTodo } from "../../../reducers/todos";
import { ITodo } from "../../../types/todo";

export interface ITodoFormProps {
    todo?: ITodo
    afterSubmit?: () => void
}

export const TodoForm = forwardRef((props: ITodoFormProps, ref: any) => {
    const dispatch = useAppDispatch();
    const [description, setDescription] = useState<string>(props.todo ? props.todo.description : "")
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
        if(description.length > 255 || description.length <= 0) {
            setValid(false);
            return false;
        }
        setValid(true);
        return true;
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(!valid()) {
            return;
        }
        commitSubmit();
    }

    const commitSubmit = () => {
        if(props.todo) {
            dispatch(updateTodo({
                ...props.todo,
                description: description,
            }))
        } else {
            dispatch(createTodo({
                id: -1,
                description: description,
                marked: false
            }))
        }
        if(props.afterSubmit) props.afterSubmit();
        setDescription("");
    }
   return (<Form onSubmit={submit}>
    <Form.Group className="mb-3">
        <Form.Label>{props.todo ? "Update" : "Create"} To-do:</Form.Label>
        <Row>
            <Col md={props.todo ? "12" : "11"}>
                <Form.Control isInvalid={!isValid} type="text" placeholder="Description ..." value={description} onChange={(e: ChangeEvent<any>) => {setDescription(e.target.value)}}/>
                <Form.Control.Feedback type="invalid">
                    Cannot be empty or longer than 255 characters.
                </Form.Control.Feedback>
            </Col>
            <Col md="1" style={{display: props.todo ? "none" : "block"}}>
                <Button onClick={submit}>Add</Button>
            </Col>
        </Row>
    </Form.Group>
  </Form>)
})