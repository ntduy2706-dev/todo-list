import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'
import TodoPropType from '../../proptypes'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneToDo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneToDo, startEditTodo, deleteTodo } = props

  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneToDo(idTodo, event.target.checked)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'To do'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={onChangeCheckbox(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                🖊️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoPropType),
  handleDoneToDo: PropTypes.func,
  startEditTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}
