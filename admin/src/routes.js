import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import NewProduct from './components/_dashboard/products/NewProduct';
import NewBlogPost from './components/_dashboard/blog/NewBlogPost';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User />},
        { path: 'products', element: <div className="cc-products"><Outlet /></div>, children: [
          {path: "/", element: <Products />},
          {path: "/new", element: <NewProduct />},
        ] },
        { path: 'blog', element: <div className="cc-blogs"><Outlet /></div>, children: [
          {path: "/", element: <Blog />},
          {path: "/new", element: <NewBlogPost />},
        ] },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/products',
      element: <DashboardLayout />,
      children: [{ path: 'new', element: <NewProduct /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
