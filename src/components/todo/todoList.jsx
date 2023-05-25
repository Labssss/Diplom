import { useState } from "react";
import { TodoItem } from "./todoItem";
import { Modal } from '../Modal';
import { CreateTodoItem } from './createTodoItem';

export function TodoList(props) {
    const [useTodoItems, setTodoItems] = useState([...props.items]);
    const [modalCreateTodoItem, setModalCreateTodoItem] = useState(false)

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday']
    const mounth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentDate = new Date();
    const itemDate = new Date(props.date)

    const createHandler = (todo) => {
        setModalCreateTodoItem(false)
        setTodoItems(prev => [...prev, todo])
    }

    const deleteHandler = (todo) => {
        setTodoItems(prev => prev.filter(e => e !== todo))
    }

    const editHandler = (todo, newTodo) => {
        setTodoItems(prev => prev.map(e => e === todo ? newTodo : e))
    }


    return (
        <>
            {modalCreateTodoItem && 
            <Modal title="Create new task" onClose={ () => setModalCreateTodoItem(false)}>
                <CreateTodoItem onCreate={createHandler} date={props.date}></CreateTodoItem>
            </Modal>}
            <div className="flex flex-col justify-start max-w-screen mx-40 mt-10">
                <div className="flex w-full py-2 border-b-2">
                    <h2 className="font-bold text-2xl">
                        {`${itemDate.getDate()} ${mounth[itemDate.getMonth()]}`} ‧ {
                        itemDate.getFullYear() === currentDate.getFullYear() && 
                        itemDate.getMonth() === currentDate.getMonth() ?
                            itemDate.getDate() === currentDate.getDate() ? 'Today' : 
                            itemDate.getDate() === currentDate.getDate() + 1 ? 'Tomorrow' : 
                            itemDate.getDate() === currentDate.getDate() - 1 ? 'Yesterday' : `${week[itemDate.getDay()]}` 
                        : `${week[itemDate.getDay()]}`}
                    </h2>
                    {/* <span className="text-[#8ea6c8] text-sm ml-1 align-text-bottom">Thursday 28 May</span> */}
                </div>
                {useTodoItems.length ? useTodoItems.map((item) => <TodoItem data={item} key={item.id} onDelete={deleteHandler} onEdit={editHandler}/>) : props.onDelete(props.date)}
                <div className="flex flex-grow align-center py-2">
                    <button className="flex w-full text-lg text-gray-500 ml-2 hover:text-gray-700" onClick={() => setModalCreateTodoItem(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="ml-2">Add task</span>
                    </button>
                </div>
            </div>
        </>
    )
}