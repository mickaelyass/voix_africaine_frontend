// components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { User } from '../../types';



export default function Sidebar({ user }) {
  return (
    <div className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              end
              className={({isActive}) => 
                `block px-4 py-2 rounded font-medium ${
                  isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/livres-publics" 
              className={({isActive}) => 
                `block px-4 py-2 rounded ${
                  isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Livres publics
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/mes-livres" 
              className={({isActive}) => 
                `block px-4 py-2 rounded ${
                  isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Mes livres
            </NavLink>
          </li>
          {user?.role === 'admin' && (
            <>
              <li>
                <NavLink 
                  to="/dashboard/admin" 
                  className={({isActive}) => 
                    `block px-4 py-2 rounded ${
                      isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Administration
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/admin/ajouter-livre" 
                  className={({isActive}) => 
                    `block px-4 py-2 rounded ${
                      isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Ajouter un livre
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}