// import React from 'react';
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoutes';
// import Layout from './components/layout/Layout';
// import Login from './pages/auth/Login';
// // import Signup from './pages/auth/Signup';
// // import Logout from './pages/auth/Logout';
// import SalesDashboard from './pages/dashboard/SalesDashboard';
// // import Deals from './pages/Deals';
// // import Customers from './pages/Customers';
// // import Orders from './pages/Orders';
// // import Settings from './pages/Settings';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AuthProvider><Layout /></AuthProvider>,
//     children: [
//       { index: true, element: <Navigate to="/dashboard" replace /> },
//       { path: 'dashboard', element: <ProtectedRoute><SalesDashboard /></ProtectedRoute> },
//       { path: 'deals', element: <ProtectedRoute><Deals /></ProtectedRoute> },
//       { path: 'customers', element: <ProtectedRoute><Customers /></ProtectedRoute> },
//       { path: 'orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
//       { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
//     ],
//   },
//   { path: '/login', element: <AuthProvider><Login /></AuthProvider> },
//   { path: '/signup', element: <AuthProvider><Signup /></AuthProvider> },
//   { path: '/logout', element: <AuthProvider><Logout /></AuthProvider> },
// ]);

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Logout from './pages/auth/Logout';
import SalesDashboard from './pages/dashboard/SalesDashboard';
// import Deals from './pages/Deals';
// import Customers from './pages/Customers';
// import Orders from './pages/Orders';
// import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <ProtectedRoute><SalesDashboard /></ProtectedRoute> },
      // { path: 'deals', element: <ProtectedRoute><Deals /></ProtectedRoute> },
      // { path: 'customers', element: <ProtectedRoute><Customers /></ProtectedRoute> },
      // { path: 'orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      // { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
    ],
  },
  { path: '/login', element: <AuthProvider><Login /></AuthProvider> },
  { path: '/signup', element: <AuthProvider><Signup /></AuthProvider> },
  { path: '/logout', element: <AuthProvider><Logout /></AuthProvider> },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;