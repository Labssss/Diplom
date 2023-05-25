import {useState, useEffect, useContext} from 'react';
import { TodoList } from '../components/todo/todoList';
import { Modal } from '../components/Modal';
import { CreateTodo } from '../components/todo/createTodo';
import { CustomContext } from "../Context";

export function TodoPage() {
    const [useTodos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [modalCreateTodo, setModalCreateTodo] = useState(false)
    const {user} = useContext(CustomContext);

    const createHandler = (todo) => {
        setModalCreateTodo(false)
        setTodos(prev => [...prev, {
            date: todo.complete_date,
            items: [todo]
        }])
        setTodos(prev => prev.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1))
        console.log(todo)
    }

    const deleteHandler = (todo) => {
        setTodos(prev => prev.filter(e => e.date !== todo))
    }

    useEffect(() => {
        getTodo();
    }, []);

    function getTodo() {
        fetch('http://localhost:3001/api/todolist/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }})
            .then(async (response) => {
                if (response.status < 200 || response.status >= 300) {
                    const {message} = await response.json()
                    setError(message)
                    setTimeout( () => setError(''), 5000)
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setTodos(data);
            });
        }
        return (
            <>
            {modalCreateTodo && 
            <Modal title="Add new date" onClose={ () => setModalCreateTodo(false)}>
                <CreateTodo onCreate={createHandler} dates={useTodos.map(e => e.date)}></CreateTodo>
            </Modal>}
                <div className="flex flex-col w-full align-center body-font mb-5">
                    <header className="text-gray-600 body-font">
                        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                            onClick={ () => setModalCreateTodo(true)}
                            >Add new date
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </button>
                        </div>
                    </header>
                    { useTodos.length 
                    ? useTodos.map((e) => <TodoList items={e.items} date={e.date} key={e.date} onDelete={deleteHandler}/>) 
                    : <h2 className='text-4xl mt-4 mb-2 text-black-600 mx-20'>Your todo lists are empty</h2>
                    }
                </div>
            </>
        )
}