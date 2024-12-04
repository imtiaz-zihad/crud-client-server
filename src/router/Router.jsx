import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/root/Home.jsx";
import Root from "../layout/root/Root.jsx";
import Schedule from "../pages/Schedule/Schedule.jsx";
import AddSchedule from "../pages/addSchedule/AddSchedules.jsx";
import SignIn from "../pages/signin/SignIn.jsx";
import SignUp from "../pages/signup/SignUp.jsx";
import UpdateSchedule from "../pages/updateSchedule/UpdateSchedule.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allSchedule",
        element: <Schedule></Schedule>,
        loader: () => fetch("http://localhost:5000/schedule"),
      },

      {
        path: "/addSchedule",
        element: <AddSchedule></AddSchedule>,
      },
      {
        path: "/update/:id",
        element: <UpdateSchedule></UpdateSchedule>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/schedule/${params.id}`),
      },
    ],
  },
  {
    path: "signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);

export default router;
