import {useState, useEffect, useContext} from 'react';
import { Modal } from '../components/Modal';
import { CreateProject } from '../components/project/createProject';
import { Project } from '../components/project/project';
import { CustomContext } from "../Context";

export function ProjectsPage() {
    const [error, setError] = useState('');
    const [useProjects, setProjects] = useState([]);
    const [modalCreateProject, setModalCreateProject] = useState(false)
    const {user} = useContext(CustomContext);
    
    const createHandler = (project) => {
        setModalCreateProject(false)
        setProjects(prev => [...prev, project])
    }

    const deleteHandler = (project) => {
        setProjects(prev => prev.filter(e => e !== project))
    }

    const editHandler = (project, newProject) => {
        setProjects(prev => prev.map(e => e === project ? newProject : e))
    }

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
        fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/api/projects/`,{
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
                setProjects(data);
            });
        }

    return (
        <>
        { modalCreateProject && <Modal title="New project" onClose={ () => setModalCreateProject(false)}>
            <CreateProject onCreate={createHandler}></CreateProject>
        </Modal>}
        <section className="text-gray-600 body-font w-full">
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    onClick={ () => setModalCreateProject(true)}
                    >New project 
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </div>
            </header>
            <div className="container px-5 pb-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                { useProjects.length ? useProjects.map((e) => <Project data={e} key={e.id} onDelete={deleteHandler} onEdit={editHandler}/>) 
                : <h2 className='text-4xl mt-4 mb-2 text-black-600 mx-20'>Your projects are empty</h2>}
                </div>
            </div>
            </section>
        </>
    )
}