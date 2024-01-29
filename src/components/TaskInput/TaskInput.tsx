import { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import TodoPropType from '../../proptypes'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  completedEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, completedEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      completedEditTodo()
      if (name) setName('')
    } else {
      if (name) {
        addTodo(name)
        setName('')
      }
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChange}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completedEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoPropType, PropTypes.oneOf([null])])
}
