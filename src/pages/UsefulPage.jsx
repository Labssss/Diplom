import {useState, useEffect, useContext} from 'react';
import { Useful } from '../components/useful/useful';
import { Modal } from '../components/Modal';
import { CreateUseful } from '../components/useful/createUseful';
import { CustomContext } from "../Context";

export function UsefulPage() {
  const [error, setError] = useState('');
  const [usefuls, setUsefuls] = useState([]);
  const [modalCreate, setModalCreate] = useState(false)
  const {user} = useContext(CustomContext);

  useEffect(() => {
    getUsefuls();
  }, []);

  const createHandler = (useful) => {
    setModalCreate(false)
    setUsefuls(prev => [...prev, useful])
    console.log(usefuls)
  }

  const deleteHandler = (useful) => {
    setUsefuls(prev => prev.filter(e => e !== useful))
  }

  const editHandler = (useful, newUseful) => {
    setUsefuls(prev => prev.map(e => e === useful ? newUseful : e))
  }

  async function getUsefuls() {
    await fetch('http://localhost:3001/api/useful', {
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
          setUsefuls(data);
      });
  }

  return (
    <>
      { modalCreate && <Modal title="New website" onClose={ () => setModalCreate(false)}>
        <CreateUseful onCreate={createHandler}></CreateUseful>
      </Modal>}
      <div className='flex flex-col w-full'>
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                onClick={ () => setModalCreate(true)}
                >New website 
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
            </div>
        </header>
        <div className='w-2/3 mx-20'>
          { usefuls.length ? usefuls.map((item) => <Useful data={item} key={item.id} onDelete={deleteHandler} onEdit={editHandler}/>) : <h2 className='text-4xl mt-4 mb-2 text-black-600'>Your useful sites are empty</h2>}
        </div>
      </div>
    </>
  )
}