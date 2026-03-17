/*
-------------------------------------------------------------
 APPLICATION ENTRY POINT
-------------------------------------------------------------
 This file bootstraps the React application and configures:
   1. Global Providers (Redux + User Context)
   2. Application Layout
   3. Routing using React Router
-------------------------------------------------------------
 */
import React from "react";
import ReactDOM from "react-dom/client";

/* Router imports */
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

/* Redux store */
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";

/* Context providers */
import { UserProvider } from "./utils/UserContext.js";

/* Components */
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js";
import Offers from "./components/Offers.js";
import Cart from "./components/Cart.js";
import ResMenu from "./components/ResMenu.js";
import ConfirmedOrder from "./components/ConfirmedOrder.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Error from "./components/Error.js";

/* =============================================================
   APPLICATION LAYOUT COMPONENT
   -------------------------------------------------------------
   This component defines the global layout of the application.
   It wraps the app with Redux and User Context providers and
   renders the common Header across all pages.
   The <Outlet /> renders the matched route component.
============================================================= */

function AppLayout() {
  return (
    <div className="app">
      <Provider store={appStore}>
        <UserProvider>
          {/* Global Navigation */}
          <Header />

          {/* Render matched child route */}
          <Outlet />
        </UserProvider>
      </Provider>
    </div>
  );
}

/* =============================================================
   ROUTER CONFIGURATION
   -------------------------------------------------------------
   Defines all application routes using React Router v6.
============================================================= */

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    /* Error page if route fails */
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant/:resId",
        element: <ResMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        /* Protected Route for order confirmation page */
        path: "/orderplaced",
        element: (
          <PrivateRoute>
            <ConfirmedOrder />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

/*Mount React application to the DOM */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
