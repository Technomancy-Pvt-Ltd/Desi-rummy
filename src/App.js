import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashbord/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userlist from "./pages/Users_list/UserList";
import Userinfo from "./pages/Users_list/IndividualUserInfo";
import Footer from "./components/Footer";
import Loder from "./components/Loader";
import Sidebar from "./components/Sidebar/SideBar";
import Appbar from "./components/Appbar";
import PayoutList from "./pages/PayoutQueue/PayoutList";
import PayInList from "./pages/PayInQueue/PayInQueue";
import PreTransaction from "./pages/trasaction/previousTransition";
import { useSelector } from "react-redux";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);

 

  if (isLoading) {
    return <Loder />;
  }

  return (
    <Router>
      {user && user?.result?.privilage === 1 ? (
        <>
          <Sidebar>
            <Appbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Users" element={<Userlist />}></Route>
              <Route path="/PayOutList" element={<PayoutList />} />
              <Route path="/PayInList" element={<PayInList />} />
              <Route path="/UserInfo/:id" element={<Userinfo />} />
              <Route
                path="/PreviousTransaction/:id"
                element={<PreTransaction />}
              />
              {/* Add a fallback route for handling 404 errors */}
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </Sidebar>
        </>
      ) : (
        <Login />
      )}
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
