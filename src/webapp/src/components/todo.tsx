import { ITodo } from "../types/todo"

export interface ITodoProps {
  todo: ITodo
}

function Todo(props: ITodoProps) {
  return (
    <div>
      {props.todo.description}
    </div>
  )
}

export default Todo