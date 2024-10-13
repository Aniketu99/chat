import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import User from './User.jsx'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element:<User/>
  },
  {
    path:'/chat/:userName',
    element:<App/>
  }
]);

createRoot(document.getElementById('root')).render(
   <RouterProvider router={router} />
)
