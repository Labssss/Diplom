import { useState, useContext } from "react"
import {CustomContext} from "../../Context";

export function EditProject(props) {
    const [valueUrl, setValueUrl] = useState(props.data.url)
    const [error, setError] = useState('')
    const {user} = useContext(CustomContext);

    const submitHandler = async (event) => {
        event.preventDefault()

        if (valueUrl.trim().length === 0) {
            setError('Please enter valid url')
            return
        } else {
            setError('')
        }

        await fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/api/projects/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(
                {
                "id": props.data.id,
                "url": valueUrl.includes('https://') ? valueUrl : `https://${valueUrl}`
                }
            ),
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
        .then(data => {
            props.onEdit(data)
        });
            
    }

    const changeHandler = (event) => {
        let input = event.target.id
        switch (input) {
            case "InputUrl":
                setValueUrl(event.target.value)
                break;

            default:
                break;
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="form-group mb-6">
                    <label htmlFor="InputUrl" className="form-label inline-block mb-2 text-gray-700">Url</label>
                    <input type="text" className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="InputUrl"
                        placeholder="https://www.google.com/"
                        value={valueUrl}
                        maxLength="255"
                        onChange={changeHandler}
                    />
                </div>
                { error && <p className="mb-2 text-red-700">{error}</p>}
                <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end">
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
                    <button type="submit" className="px-6
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
                        >
                        Confirm
                    </button>
                </div>
            </form>
        </>
    )
} 