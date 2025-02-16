import { useState, useEffect } from 'react';
import TodoForm from './TodoForm/TodoForm';
import TodoCard from './TodoCard/TodoCard';
import Header from './Header/Header';
import './Todo.scss';

function Index() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            localStorage.removeItem('todos');
        }
    }, [todos]);

    const addOrUpdateTodo = (newTodo) => {
        const isDuplicate = todos.some(todo =>
            todo.name === newTodo.name &&
            todo.email === newTodo.email &&
            todo.phone === newTodo.phone &&
            todo.id !== newTodo.id
        );

        if (isDuplicate) {
            alert("⚠️ Bu ma'lumot allaqachon mavjud!");
            return;
        }

        if (newTodo.id) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
            );
        } else {
            setTodos([...todos, { ...newTodo, id: Date.now().toString() }]);
        }
        setEditingTodo(null);
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
    };

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    const filteredTodos = todos.filter((todo) => {
        const combinedData = `
            ${todo.name} 
            ${todo.email} 
            ${todo.phone} 
            ${todo.birthDate} 
            ${todo.gender} 
            ${todo.hobbies.join(' ')} 
            ${todo.country} 
            ${todo.comment}
        `.toLowerCase();

        return combinedData.includes(searchTerm.toLowerCase());
    });

    return (
        <section className="container">
            <div className={`left ${isMenuOpen ? '' : 'closed'}`}>
                <h1>Todo List</h1>
                <TodoForm addOrUpdateTodo={addOrUpdateTodo} editingTodo={editingTodo} />
            </div>
            <div className={`right ${isMenuOpen ? '' : 'full-width'}`}>
                <div className='header'>
                    <Header  onSearch={handleSearch} toggleMenu={toggleMenu} />
                </div>
                <div className="right-content">
                    {searchTerm ? (
                        filteredTodos.length > 0 ? (
                            filteredTodos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <p>❗ Hech qanday natija topilmadi.</p>
                        )
                    ) : (
                        todos.length > 0 ? (
                            todos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <p>📋 Hech qanday ma'lumot mavjud emas.</p>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default Index;
