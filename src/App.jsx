import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from './pages/ProjectsPage';
import { TodoPage } from './pages/TodoPage';
import { UsefulPage } from './pages/UsefulPage';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { NotFound } from './pages/NotFound';
import { CustomContext } from "./Context";

function App() {
  const {user, role, isLogged} = useContext(CustomContext);
  return (
    <>  
      <div className="flex min-h-screen w-full bg-gray-50">
          <Navigation/>
          <Routes>
              <Route path="/" element={ <HomePage/> } />
              {!isLogged && <Route path='/login' element={ <Login/> }/>}
              {!isLogged && <Route path='/registration' element={ <Registration/> }/>}
              {isLogged && <Route path="/useful" element={ <UsefulPage/> } />}
              {isLogged && <Route path="/todo" element={ <TodoPage/> } />}
              {isLogged && <Route path="/projects" element={ <ProjectsPage/> } />}
              <Route path='/*' element={<NotFound/>}/>
          </Routes>
      </div>

    </>
  );
}

export default App;
