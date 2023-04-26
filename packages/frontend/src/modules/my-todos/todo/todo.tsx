import { useHistory } from "react-router-dom"
import { ITodo } from "../../common/types/todos.type"
import { v4 as uuidv4 } from 'uuid'
import { APP_KEYS } from "../../common/consts"

const Todo = ({todo, onDelete, onComplete}: {todo: ITodo, onDelete: any, onComplete: any} ) => {
  const {name, description, isCompleted, isPrivate} = todo
  const history = useHistory()
  return (
    <div>

      <h3>{name}</h3>
      <p>{description}</p>
      <p>{isCompleted ? 'Completed': 'Not completed'}</p>
      <p>{isPrivate ? 'Private': 'Public'}</p>
      <button onClick={onDelete}>Delete</button>
      {!todo.isCompleted && <button onClick={onComplete}>Complete</button>}
      <button onClick={() => history.push(`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/${todo.id}`)}>Edit</button>
      <hr />
      <br /><br /><br />
    </div>
  )
}

export default Todo