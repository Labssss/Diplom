import { useState, useContext } from "react"
import {CustomContext} from "../../Context";

export function CreateTodo(props) {
    const [valueTitle, setValueTitle] = useState('')
    const [valueDescription, setValueDescription] = useState('')
    const [valueDate, setValueDate] = useState(new Date())
    const [error, setError] = useState('')
    const {user} = useContext(CustomContext);
    
    const submitHandler = async (event) => {
        event.preventDefault()
        if (valueTitle.trim().length === 0) {
            setError('Please enter valid title')
            return
        } else if (valueDate === '') {
            setError('Please enter valid date')
            return
        } else if (props.dates.includes(formatDate(valueDate))) {
            setError('Such a date is already available')
            return
        }
        else {
            setError('')
        }

        await fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/api/todolist/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(
                {
                "complete_date": formatDate(valueDate),
                "title": valueTitle,
                "description": valueDescription,
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

            case "InputDescription":
                setValueDescription(event.target.value)
                break;
            
            case "InputDate":
                setValueDate(new Date(event.target.value))
                break;

            default:
                break;
        }
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

                <div className="form-group mb-6">
                    <label htmlFor="InputDate" className="form-label inline-block mb-2 text-gray-700">Date</label>
                    <input type="date" className="form-control block 
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="InputDate"
                        // value={`${valueDate.getFullYear()}-${valueDate.getMonth() + 1 > 9 ? valueDate.getMonth() + 1 : '0' + (valueDate.getMonth() + 1)}-${valueDate.getDate() > 9 ? valueDate.getDate() : '0' + valueDate.getDate()}`}
                        value={formatDate(valueDate)}
                        min={formatDate(new Date())}
                        onChange={changeHandler}
                    />
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