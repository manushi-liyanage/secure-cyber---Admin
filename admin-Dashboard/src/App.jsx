
import { ThemeProvider } from './contexts/theme-context'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Layout from './routes/layout';
import Login from './routes/Login/Login'
import DashboardPage from './routes/dashboard/page';
import PostManagement from './routes/postManagement/Post'

function App() {
  const router = createBrowserRouter([
    {
        path:"/",
        element:<Login />
    },

    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            
            {
                path: "analytics",
                element: <h1 className="title">Analytics</h1>,
            },
            {
                path: "reports",
                element: <h1 className="title">Reports</h1>,
            },
            {
                path: "PostManagement",
                element: <PostManagement/>,
                     
                     
                    
            },
            {
                path: "new-customer",
                element: <h1 className="title">New Customer</h1>,
            },
            {
                path: "verified-customers",
                element: <h1 className="title">Verified Customers</h1>,
            },
            {
                path: "UserMangement",
                element:<div> 
                       <h1 className="title">User Management</h1> 
                       <p className='text-gray-50'>user management content</p>
                       </div>,
            },
            {
                path: "addUser",
                element: <h1 className="title">Add New User</h1>,
            },
            {
                path: "logout",
                element: <h1 className="title">Logout</h1>,
            },
            {
                path: "settings",
                element: <h1 className="title">Settings</h1>,
            },
        ],
    },
]);
  return (
    < ThemeProvider storageKey='theme'>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
