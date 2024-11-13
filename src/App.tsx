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

import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './store';
// import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Logout from './pages/auth/Logout';
import SalesDashboard from './pages/dashboard/SalesDashboard';
import { checkAuthStatus } from './store/slices/authSlice';
import Deals from './pages/deals/DealsList';
import DealsOverView from './pages/deals/DealsOverView';
import DealCreation from './pages/deals/DealCreation';
// import Customers from './pages/Customers';
// import Orders from './pages/Orders';
// import Settings from './pages/Settings';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <AuthProvider>
//         <Layout>
//           <Outlet />
//         </Layout>
//       </AuthProvider>
//     ),
//     children: [
//       { index: true, element: <Navigate to="/dashboard" replace /> },
//       { path: 'dashboard', element: <ProtectedRoute><SalesDashboard /></ProtectedRoute> },
//       // { path: 'deals', element: <ProtectedRoute><Deals /></ProtectedRoute> },
//       // { path: 'customers', element: <ProtectedRoute><Customers /></ProtectedRoute> },
//       // { path: 'orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
//       // { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
//     ],
//   },
//   { path: '/login', element: <AuthProvider><Login /></AuthProvider> },
//   { path: '/signup', element: <AuthProvider><Signup /></AuthProvider> },
//   { path: '/logout', element: <AuthProvider><Logout /></AuthProvider> },
// ]);
const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<SalesDashboard />} />
        <Route path="deals">
          <Route path="deals-list" element={<Deals />} />
          <Route path="create" element={<DealCreation />} />
          <Route path="deals-overview" element={<DealsOverView />} />
        </Route>
        <Route path="sales">
          <Route path="overview" element={<SalesDashboard />} />
          {/* <Route path="transactions" element={<SalesTransactions />} /> */}
        </Route>
        {/* <Route path="customers">
          <Route path="list" element={<CustomersList />} />
          <Route path="analytics" element={<CustomersAnalytics />} />
        </Route> */}
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;