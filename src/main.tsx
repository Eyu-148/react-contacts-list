// routes manager
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root, { actionNew } from './routes/root';
import ErrorPage from './error_page';
import Contact, { handleFavorite } from './routes/contact';
import NewContact, { actionEdit } from './routes/newContact';
import { actionDestroy } from './routes/destroy';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: actionNew,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        action: handleFavorite,
      }, 
      {
        path: "contacts/:contactId/edit",
        element: <NewContact isNew={false} />,
        action: actionEdit,
      },
      {
        path: "newContact",
        element: <NewContact isNew={true} />,
      },
      {
        path: "contacts/:contactId/destroy",
        action: actionDestroy,
      }
  ]},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
