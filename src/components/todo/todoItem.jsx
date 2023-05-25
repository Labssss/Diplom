import { useState, useContext } from "react";
import {CustomContext} from "../../Context";
import { Modal } from "../Modal";
import { EditTodoItem } from "./editTodoItem";

export function TodoItem(props) {
    const [modalEdit, setModalEdit] = useState(false)
    const {user} = useContext(CustomContext);
    const [error, setError] = useState('')

    const currentDate = new Date(formatDate(new Date()))
    const itemCompleteDate = new Date(formatDate(new Date(props.data.complete_date)))

    const editHandler = async (data) => {
        setModalEdit(false)
        props.onEdit(props.data, data)
    }
    
    const deleteHandler = async () => {
        await fetch(`http://localhost:3001/api/todolist/${props.data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(async (response) => {
            if (response.status < 200 || response.status >= 300) {
                const {message} = await response.json()
                setError(message)
                setTimeout( () => setError(''), 5000)
                throw new Error(response.statusText);
            }
            return props.onDelete(props.data);
        })
    } 

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <>
            { modalEdit && 
            <Modal title="Edit task" onClose={ () => setModalEdit(false)}>
                <EditTodoItem data={props.data} onEdit={editHandler} onClose={() => setModalEdit(false)}></EditTodoItem>
            </Modal>}
            <div className="flex flex-row py-4 border-b-2 w-full">
                <div className="flex items-center">
                    <button className={`completebutton w-6 h-6 border-2 ${itemCompleteDate < currentDate ? ' text-red-600 border-red-400' : 'border-gray-400 ' } rounded-full`} onClick={() => deleteHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="p-0.5 opacity-0 ease-in duration-150 hover:opacity-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col flex-wrap w-full items-start">
                    <h3 className="text-lg ml-2">
                    {props.data.title}
                    </h3>
                    <p className="text-sm ml-2">
                    {props.data.description}
                    </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setModalEdit(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </div>     
        </>
    )
}
