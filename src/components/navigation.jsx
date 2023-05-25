import { useState, useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomContext } from "../Context";

export function Navigation() {
    const {role, logOutUser, isLogged} = useContext(CustomContext);
    const location = useLocation();
    return (
        <aside className="hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0 sticky top-0 max-h-screen">
        <div className="py-4 text-gray-400">
          <Link className="ml-6 text-lg font-bold text-gray-200" to="/">
            UX Dashboard
          </Link>
          
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              {(location.pathname === '/') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
              <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/') && 'text-gray-100'}`} to="/">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-4">Домой</span>
              </Link>
            </li>
          </ul>
          { !isLogged && 
            <ul className="mt-2">
              <li className="relative px-6 py-3 ">
                {(location.pathname === '/login') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/login') && 'text-gray-100'}`} to="/login">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  <span className="ml-4">Вход</span>
                </Link>
              </li>
              <li className="relative px-6 py-3">
                {(location.pathname === '/registration') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/registration') && 'text-gray-100'}`} to="/registration">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M16 19h6"></path>
                  <path d="M19 16v6"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                </svg>
                  <span className="ml-4">Регистрация</span>
                </Link>
              </li>
            </ul>
          }
          {
            isLogged && 
            <ul>
              <li className="relative px-6 py-3">
                {(location.pathname === '/useful') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/useful') && 'text-gray-100'}`} to="/useful">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                  <span className="ml-4">Useful</span>
                </Link>
              </li>
              <li className="relative px-6 py-3">
                {(location.pathname === '/todo') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/todo') && 'text-gray-100'}`} to="/todo">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-check w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
                  <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
                  <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
                  <path d="M11 6l9 0"></path>
                  <path d="M11 12l9 0"></path>
                  <path d="M11 18l9 0"></path>
                </svg>
                  <span className="ml-4">Todo</span>
                </Link>
              </li>
              <li className="relative px-6 py-3">
                {(location.pathname === '/projects') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/projects') && 'text-gray-100'}`} to="/projects">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-figma w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z"></path>
                  <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15"></path>
                </svg>
                  <span className="ml-4">Projects</span>
                </Link>
              </li>
              <li className="relative px-6 py-3 border-t border-solid border-gray-50">
                <button className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200`} onClick={() => logOutUser()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                </svg>
                  <span className="ml-4">Выход</span>
                </button>
              </li>
            </ul>
          }
        </div>
      </aside>
    )
}