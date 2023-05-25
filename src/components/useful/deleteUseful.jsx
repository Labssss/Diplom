import { useState, useContext } from "react"
import {CustomContext} from "../../Context";

export function DeleteUseful(props) {
    const {user} = useContext(CustomContext);
    const [error, setError] = useState('')
    
    const confirmHandler = async (event) => {
        await fetch(`http://localhost:3001/api/useful/${props.data.id}`, {
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
            return response.json();
        })
        .then(() => {
            props.onDelete()
        })
    }

    return(
        <>
            <div className="modal-body relative p-4">
            Delete the "{props.data.title}" website?
            </div>
            <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button" className="px-6
                    py-2.5
                    bg-purple-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-purple-700 hover:shadow-lg
                    focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-purple-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out" data-bs-dismiss="modal"
                    onClick={props.onClose}
                    >
                    Close
                </button>
                <button type="button" className="px-6
                    py-2.5
                    bg-blue-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out
                    ml-1"
                    onClick={confirmHandler}
                    >
                    Confirm
                </button>
            </div>
        </>
    )
}