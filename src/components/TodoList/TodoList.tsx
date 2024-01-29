import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todoString = localStorage.getItem('todos')
  const todosObject: Todo[] = JSON.parse(todoString || '[]')
  const newTodosObj = handleNewTodos(todosObject)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todosObject: Todo[] = JSON.parse(todoString || '[]')
    setTodos(todosObject)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    syncReactToLocal((todosObject: Todo[]) => [...todosObject, todo])
  }

  const handleDoneToDo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const completedEditTodo = () => {
    const handler = (todosObject: Todo[]) => {
      return todosObject.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }

  const deleteTodo = (idTodo: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObject: Todo[]) => todoObject.filter((todo) => todo.id !== idTodo)

    setTodos(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          completedEditTodo={completedEditTodo}
        />
        <TaskList
          todos={notDoneTodos}
          handleDoneToDo={handleDoneToDo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneToDo={handleDoneToDo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
