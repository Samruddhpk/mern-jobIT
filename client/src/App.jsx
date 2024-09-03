import { createBrowserRouter, RouterProvider } from "react-router-dom";

// imports
import { DashboardLayout, Error, HomeLayout, Landing, Login, Register, AddJob, Admin, AllJobs, Profile, Stats } from "./pages";


// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

// loaders
import { loader as dashboardLoader } from "./pages/DashboardLayout";

// check theme

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === true;
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [

      { index: true, element: <Landing /> },

      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: "all-jobs",
            element: <AllJobs />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "stats",
            element: <Stats />
          }
        ]
      },
    ]
  },

]);

const App = () => {
  return (
    <RouterProvider router={router} />);
};
export default App;