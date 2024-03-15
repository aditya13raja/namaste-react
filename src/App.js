import React from 'react';
import ReactDOM from 'react-dom/client';
import "./app.scss";
import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import About from './components/About';
import Error from './components/Error';
import Contact from './components/Contact';
import ResturantMenu from './components/ResturantMenu';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/resturant/:resId',
        element: <ResturantMenu />
      }
    ]
  }  
])
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
