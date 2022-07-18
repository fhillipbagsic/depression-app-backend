import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ClinicianNav = React.lazy(() =>
  import("./Components/Navbar/ClinicianNav")
);
const LazyProfile = React.lazy(() => import("./Components/Profile/Profile"));
const AdminProfile = React.lazy(() =>
  import("./Components/Profile/AdminProfile")
);
const Login = React.lazy(() => import("./Components/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./Components/Login/ForgotPassword")
);
const Newpassword = React.lazy(() => import("./Components/Login/NewPass"));
const Home = React.lazy(() => import("./Components/Login/Home"));
const EmovaultForm = React.lazy(() =>
  import("./Components/EmovaultForm/EmovaultForm")
);
const ChangePassword = React.lazy(() =>
  import("./Components/ChangePassword/ChangePassword")
);

const ClinicanChangePassword = React.lazy(() =>
  import("./Components/ChangePassword/ClinicianChangePassword")
);
const AdminChangePassword = React.lazy(() =>
  import("./Components/ChangePassword/AdminChangePassword")
);
const ClinicianClients = React.lazy(() =>
  import("./Components/ClinicianClients/ClinicianClients")
);
const Journal = React.lazy(() => import("./Components/Journal/Journal"));
const UserManagement = React.lazy(() =>
  import("./Components/UserManagement/UserManagement")
);
const AddUser = React.lazy(() => import("./Components/AddUser/AddUser"));
const UpdateUser = React.lazy(() =>
  import("./Components/UpdateUser/UpdateUser")
);
const ClinicianList = React.lazy(() =>
  import("./Components/ClinicianList/ClinicianList")
);
const ListClients = React.lazy(() =>
  import("./Components/ListClients/ListClients")
);
const CreateAccount = React.lazy(() =>
  import("./Components/CreateAccount/CreateAccount")
);
const PreviewAccount = React.lazy(() =>
  import("./Components/PreviewAccount/PreviewAccount")
);

const ClinicianProfile = React.lazy(() =>
  import("./Components/Profile/ClinicianProfile")
);

const ClinicianProfile_ = React.lazy(() =>
  import("./Components/Profile/ClinicianProfile_")
);
const Navbar = React.lazy(() => import("./Components/Navbar/EmoNavbar"));
const ClientNav = React.lazy(() => import("./Components/Navbar/ClientNav"));
const DatePick = React.lazy(() => import("./Components/DatePick/DatePick"));
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <Login />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <Home />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicianProfile"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicianProfile />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ForgotPassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ForgotPassword />
            </React.Suspense>
          }
        ></Route>
        <Route
          caseSensitive
          path="/Newpassword/:token"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <Newpassword />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/AdminProfile"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <AdminProfile />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/AdminChangePassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <AdminChangePassword />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicianProfile_"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicianProfile_ />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicanChangePassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicanChangePassword />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicanChangePassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClientNav />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicanChangePassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicianNav />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/EmovaultForm"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <EmovaultForm />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ChangePassword"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ChangePassword />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/Profile"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <LazyProfile />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicianClients"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicianClients />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/Journal"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <Journal />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/UserManagement"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <UserManagement />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/AddUser"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <AddUser />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/UpdateUser"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <UpdateUser />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ClinicianList"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ClinicianList />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/ListClients"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <ListClients />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/CreateAccount"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <CreateAccount />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/PreviewAccount"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <PreviewAccount />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/Navbar"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <Navbar />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/DatePick"
          exact
          element={
            <React.Suspense fallback="Loading Emovault...">
              <DatePick />
            </React.Suspense>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
