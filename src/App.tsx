import Home from './pages/Home';
import Layout from './components/layout/Layout';
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import ToastContainer from './components/common/toast/ToastContainer';

const routeList = [
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/books",
    element: <Layout><Books /></Layout>
  },
  {
    path: "/cart",
    element: <Layout><Cart /></Layout>
  },
  {
    path: "/order",
    element: <Layout><Order /></Layout>
  },
  {
    path: "/orderlist",
    element: <Layout><OrderList /></Layout>
  },
  {
    path: "/signup",
    element: <Layout><Signup /></Layout>
  },
  {
    path: "/reset",
    element: <Layout><ResetPassword /></Layout>
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>
  },
  {
    path: "/book/:bookId",
    element: <Layout><BookDetail /></Layout>
  },
];

const router = createBrowserRouter(routeList.map((route) => ({
  ...route,
  errorElement: <Error />,
})));

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BookStoreThemeProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </BookStoreThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;