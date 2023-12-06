
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthenticationPage from "@/components/authentication/userauthentication";
import SignUpForm from "@/components/authentication/Signup";
import Home from "@/components/Home";
import TaskPage from "@/components/Transactions";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/signin" element={<AuthenticationPage/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/transactions' element={<TaskPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
