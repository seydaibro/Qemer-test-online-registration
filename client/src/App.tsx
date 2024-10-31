import RootLayout from "./layout/RootLayout";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Signin from "./pages/signin";
import Courses from "./pages/courses";
import SignUp from "./pages/signup";
import { useState } from "react";
import CourseDetail from "./pages/courseDetail";
import StudentsList from "./pages/studentsList";
import Profile from "./pages/profile";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredPermission: string;
}

function App() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!user && !token) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  const ProtectedPage: React.FC<ProtectedPageProps> = ({
    children,
    requiredPermission,
  }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (
      !user ||
      !user.permissions.some((perm) => perm.name === requiredPermission)
    ) {
      return <Navigate to="/not_authorized" />;
    }

    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
      
          <RootLayout onOpenSignUP={()=>setIsSignUpOpen(true)} isSignUpOpen={isSignUpOpen} isSignUPClose={()=>setIsSignUpOpen(false)}/>
      
      ),
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/course-detail",
          element: <CourseDetail />,
        },

        {
          path: "/students",
          element: <StudentsList/>,
        },
        {
          path: "/profile",
          element: <Profile/>,
        },
       

       
      ],
    },
   
  
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
