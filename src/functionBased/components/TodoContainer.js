import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom"

import TodosList from "./TodosList"
import Header from "./Header";
import Navbar from "./Navbar";
import InputTodo from "./InputTodo";
import About from "../pages/About"
import NotMatch from "../pages/NotMatch"
import SinglePage from "../pages/SinglePage"

const TodoContainer = () => {
    const [todos, setTodos] = useState(getInitialTodos())

    const handleChange = id => {
        setTodos(prevState =>
            prevState.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo;
            }),
        )
    }

    const delTodo = id => {
        setTodos([
            ...todos.filter(todo => {
                return todo.id !== id;
            }),
        ])
    }

    const addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        }

        setTodos([...todos, newTodo])
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                return todo
            })
        )
    }

    function getInitialTodos() {
        // get stored items
        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
    }

    useEffect(() => {
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    }, [todos])

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="container">
                            <div className="inner">
                                <Header />
                                <InputTodo addTodoProps={addTodoItem} />
                                <TodosList
                                    todos={todos}
                                    handleChangeProps={handleChange}
                                    deleteTodoProps={delTodo}
                                    setUpdate={setUpdate}
                                />
                            </div>
                        </div>
                    }
                />

                <Route path="about/*" element={<About />}>
                    <Route path=":slug" element={<SinglePage />} />
                </Route>

                <Route path="*" element={<NotMatch />} />
            </Routes>
        </>
    )
}

export default TodoContainer