import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Contact from "./components/Contact.js";
import Offers from "./components/Offers.js";
import Cart from "./components/Cart.js";
import Error from "./components/Error.js";
import ResMenu from "./components/ResMenu.js";
import PrivateRoute from "./components/PrivateRoute.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { UserProvider } from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import ConfirmedOrder from "./components/ConfirmedOrder.js";

function MyApp() {
  return (
    <div className="my-app">
      <Provider store={appStore}>
        <UserProvider>
          <Header />
          <Outlet />
        </UserProvider>
      </Provider>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MyApp />,
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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:ResId",
        element: <ResMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orderplaced",
        element: (
          <PrivateRoute>
            <ConfirmedOrder />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
