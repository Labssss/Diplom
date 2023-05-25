import { useState, useContext } from "react"
import { CustomContext } from "../../Context";

export function CreateUseful(props) {
    const [valueTitle, setValueTitle] = useState('')
    const [valueUrl, setValueUrl] = useState('')
    const [valueDescription, setValueDescription] = useState('')
    const {user} = useContext(CustomContext);
    const [error, setError] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()

        if (valueTitle.trim().length === 0) {
            setError('Please enter valid title')
            return
        } 
        else if (valueUrl.trim().length === 0) {
            setError('Please enter valid url')
            return
        } else {
            setError('')
        }

        await fetch('http://localhost:3001/api/useful', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(
                {
                "title": valueTitle,
                "description": valueDescription,
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
            props.onCreate(data)
        });
            
    }

    const changeHandler = (event) => {
        let input = event.target.id
        switch (input) {
            case "InputTitle":
                setValueTitle(event.target.value)
                break;

            case "InputUrl":
                setValueUrl(event.target.value)
                break;

            case "InputDescription":
                setValueDescription(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="form-group mb-6">
                    <label htmlFor="InputTitle" className="form-label inline-block mb-2 text-gray-700">Title</label>
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="InputTitle"
                        placeholder="Title"
                        value={valueTitle}
                        maxLength="100"
                        onChange={changeHandler}
                    />
                </div>
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
                <div className="form-group mb-6">
                    <label htmlFor="InputDescription" className="form-label inline-block mb-2 text-gray-700">Description</label>
                    <textarea
                    className="
                        form-control
                        block
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="InputDescription"
                    rows="3"
                    placeholder="Description"
                    value={valueDescription}
                    maxLength="255"
                    onChange={changeHandler}
                    ></textarea>
                </div>
                { error && <p className="mb-2 text-red-700">{error}</p>}
                <button type="submit" className="
                    w-full
                    px-6
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
                    ease-in-out">
                Create
                </button>
            </form>
        </>
    )
} 