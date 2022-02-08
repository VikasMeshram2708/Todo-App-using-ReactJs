import React, { useState, useCallback, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const onNewTodoChange = useCallback((event) => {
        setNewTodo(event.target.value)
    }, []);

    const formSubmitted = useCallback((event) => {
        event.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([
            {
                // id: todos.length ? todos[0] + 1 : 1,
                id: new Date().getMilliseconds(),
                content: newTodo,
                done: false,
            },
            ...todos
        ]);
        setNewTodo('');
    }, [newTodo, todos]);

    useEffect(() => {
        console.log('todos', todos);
        return () => {
            console.log('Component Unmounted!');

        }
    }, [todos]);

    const addTodo = useCallback((todo, index) => (event) => {
        console.log(event.target.checked);
        const newTodos = [...todos];
        newTodos.splice(index, 1, {
            ...todo,
            done: !todo.done
        });
        setTodos(newTodos)
    }, [todos]);

    const removeTodo = useCallback((todo) => (event) => {
        setTodos(todos.filter(otherTodo => otherTodo !== todo))
        console.log('remove todo', todo);

    }, [todos]);

    const markAllDone = useCallback(() => {
        const updatedTodos = todos.map(todo => {
            return {
                ...todo,
                done: true,
            };
        });
        setTodos(updatedTodos)
    }, [todos]);

    const unMarkAllDone = useCallback(() => {
        const newUpdatedTodos = todos.map(todo => {
            return {
                ...todo,
                done: false,
            };
        });
        setTodos(newUpdatedTodos)
    }, [todos]);

    const deleteAll = useCallback(() => {
        setTodos([])
    })

    return <>
        <div className="forms w-50 mx-auto mt-4">
            <form onSubmit={formSubmitted}>
                <div className="mb-3">
                    <label htmlFor="newTodo" className="form-label">Add a Todo</label>
                    <input
                        value={newTodo}
                        onChange={onNewTodoChange}
                        type="text"
                        id="newTodo"
                        name="newTodo"
                        className="form-control"
                        placeholder="Enter a Todo"
                    />
                </div>
                <div className="button">
                    <button className="w-100 btn btn-primary">Add Todo</button>
                </div>
            </form>
            <button className="btn btn-secondary my-3 mx-2" onClick={markAllDone}>Mark All Done</button>
            <button className="btn btn-warning my-3 mx-3" onClick={unMarkAllDone}>UnMark All</button>
            <button className="btn btn-danger my-3" onClick={deleteAll}>Delete All</button>
            <ul style={{ fontSize: "25px", fontWeight: "bolder" }}>
                {todos.map((todo, index) => {
                    const { id, content, done } = todo;
                    return (
                        <div className="items mt-3" key={id}>
                            <li>
                                <span className={todo.done ? 'done' : ''}>{content}</span>
                                <input
                                    value={done}
                                    onChange={addTodo(todo, index)}
                                    type="checkbox"
                                    className="mx-3"
                                />
                                <button onClick={removeTodo(todo)} className="btn btn-danger">Delete Todo!</button>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    </>;
};

export default Todo;