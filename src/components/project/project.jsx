import { useState } from "react";
import { Modal } from "../Modal";
import { DeleteProject } from "./deleteProject";
import { EditProject } from "./editProject";

export function Project(props) {
    const [modalDeleteProject, setModalDeleteProject] = useState(false)
    const [modalEditProject, setModalEditProject] = useState(false)

    const deleteHandler = () => {
        setModalDeleteProject(false)
        props.onDelete(props.data)
    }

    const editHandler = (newProject) => {
        setModalEditProject(false)
        props.onEdit(props.data, newProject)
    }

    return (
        <>
            { modalDeleteProject && 
            <Modal title="Delete project" onClose={ () => setModalDeleteProject(false)}>
                <DeleteProject id={props.data.id} onDelete={deleteHandler} onClose={() => setModalDeleteProject(false)}></DeleteProject>
            </Modal>}
            { modalEditProject && 
            <Modal title="Edit project" onClose={ () => setModalEditProject(false)}>
                <EditProject data={props.data} onEdit={editHandler} onClose={() => setModalEditProject(false)}></EditProject>
            </Modal>}
            <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col relative">
                    <div className="">
                        <button className="flex-1 absolute top-0 right-0 mr-8 mt-1 text-gray-400 hover:text-gray-600" onClick={() => setModalEditProject(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button className="flex-1 absolute top-0 right-0 mr-2 mt-1 text-gray-400 hover:text-gray-600" onClick={() => setModalDeleteProject(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <iframe className='border: 1px solid rgba(0, 0, 0, 0.1) h-[350px]' src={`https://www.figma.com/embed?embed_host=share&url=${encodeURI(props.data.url)}`} allowFullScreen></iframe>
                </div>
            </div>   
        </>
    )
}
