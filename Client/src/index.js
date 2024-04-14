import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/UserPanel/DashBoard/DashBoard";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import AuthProvider from "./Auth/AuthProvider";
import Registrar from "./Components/UserPanel/Registrar/Registrar";
import Empleados from "./Components/UserPanel/Empleados/Empleado";
import NuevoEmpleado from "./Components/UserPanel/Empleados/NuevoEmpleado";
import ReservasPage from "./Components/Reservas/Reservaciones";
import Chat from "./Components/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path:"/registrar",
    element:<Registrar/>,
  },
  {
    path: "/dashboard",
    element: <DashBoard/>
  },
  {
    path: "/reservar",
    element: <ReservasPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);
