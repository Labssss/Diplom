import { useState } from "react";
import { DeleteUseful } from "./deleteUseful";
import { EditUseful } from "./editUseful";
import { Modal } from "../Modal";

export function Useful(props) {
    const [modalDeleteUseful, setModalDeleteUseful] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    const deleteHandler = (useful) => {
        setModalDeleteUseful(false)
        props.onDelete(props.data)
    }

    const editHandler = (newUseful) => {
        setModalEdit(false)
        props.onEdit(props.data, newUseful)
    }

    return (
        <>
        { modalDeleteUseful && 
        <Modal title="Delete website" onClose={ () => setModalDeleteUseful(false)}>
            <DeleteUseful data={props.data} onDelete={deleteHandler} onClose={() => setModalDeleteUseful(false)}></DeleteUseful>
        </Modal>}
        { modalEdit && 
        <Modal title="Edit website" onClose={ () => setModalEdit(false)}>
            <EditUseful data={props.data} onEdit={editHandler} onClose={() => setModalEdit(false)}></EditUseful>
        </Modal>}
        <section className="text-gray-600 body-font">
            <div className="container py-5">
                <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-full md:w-full">
                    <div className="flex border-2 rounded-lg border-gray-300 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-semibold mb-3">{props.data.title}</h2>
                        <p className="leading-relaxed text-base">{props.data.description}</p>
                        <a className="mt-3 text-indigo-500 inline-flex items-center" href={props.data.url} target="_blank" rel="noreferrer">{props.data.url}
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="flex-1 mb-4 text-gray-400 hover:text-gray-600" onClick={() => setModalDeleteUseful(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>

                        </button>
                        <button className="flex-1 text-gray-400 hover:text-gray-600" onClick={() => setModalEdit(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}