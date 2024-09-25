import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Cookie from 'js-cookie'
import Header from '../Header'
import TodoItem from '../TodoItem'
import './index.css'

const Home = () => {
    const [taskText, updateTask] = useState('')
    const [todoList, updateTodoList] = useState([])

    const verifyUser = Cookie.get('username')

    useEffect(() => {
        const savedTodos = localStorage.getItem(verifyUser)
        if (savedTodos) {
            updateTodoList(JSON.parse(savedTodos))
        }
    }, [verifyUser])

    if(verifyUser === undefined){
        return (<Redirect to="/login" />)
    }

    const saveTodosToLocalStorage = updatedTodoList => {
        localStorage.setItem(verifyUser, JSON.stringify(updatedTodoList))
    }

    const onEnterTask = e => {
        updateTask(e.target.value)
    }

    const onAddTask = () => {
        const newData = {
            id: uuidv4(),
            title: taskText,
            todoCompleted: "Pending",
        }

        if (taskText !== '') {
            const updatedTodoList = [...todoList, newData]
            updateTodoList(updatedTodoList)
            saveTodosToLocalStorage(updatedTodoList)
            updateTask("")
        }
    }

    const onToggleTodo = (id, status) => {
        const updatedTodo = todoList.map(each =>
            each.id === id ? {...each, todoCompleted: status} : each,
        )

        updateTodoList(updatedTodo)
        saveTodosToLocalStorage(updatedTodo)
    }

    const onDeleteTodo = id => {
        const updatedTodo = todoList.filter(each => each.id !== id)
        updateTodoList(updatedTodo)
        saveTodosToLocalStorage(updatedTodo)
        updateTask("")
    }

    const onEditTodo = id => {
        const getTodoItem = todoList.filter(each => each.id === id)
        const text = getTodoItem[0].title
        updateTask(text)
    }

    const onSaveTodo = id => {
        const updatedTodo = todoList.map(each =>
            each.id === id ? {...each, title: taskText} : each,
        )

        updateTodoList(updatedTodo)
        saveTodosToLocalStorage(updatedTodo)
        updateTask("")
    }

    return (
        <>
        <Header />
        <div className='main-todos-container'>
            <h1 className='main-heading'>Todos App</h1>
            <div className='add-todo-card'>
                <input type='text' placeholder='Enter your daily task' className='todo-input-box' value={taskText} onChange={onEnterTask}/>
                <button type='button' className='add-btn' onClick={onAddTask}>Add</button>
            </div>
            <ul className='task-list-container'>
                {todoList.map(each => (
                    <TodoItem
                        key={each.id}
                        eachTodoItem={each}
                        onDelete={onDeleteTodo}
                        onCheck={onToggleTodo}
                        onEditTodo={onEditTodo}
                        onSaveTodo={onSaveTodo}
                    />
                ))}
            </ul>
        </div>
        </>
    )
}

export default Home
