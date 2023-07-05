import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./components/Login/Login";
import { Posts } from "./components/Posts/Posts";
import { Profile } from "./components/Profile/Profile";
import { UserProfile } from "./components/Profile/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/user/:userId' element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
