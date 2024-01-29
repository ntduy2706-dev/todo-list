import { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import TodoPropType from '../../proptypes'
import connect, { ExtraInfoType } from '../../HOC/connect'
import styles from './taskInput.module.scss'
import Title from '../Title'

interface TaskInputProps extends ExtraInfoType {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  completedEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, completedEditTodo, debug, log } = props
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
      <Title />
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

export default connect(TaskInput)
