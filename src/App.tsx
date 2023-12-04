import { ThemeProvider } from "@/components/ThemeProvider"
import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> 
    <Router>
      <Header/>
      <Routes>

      </Routes>
      <Footer/>
    </Router>
    </ThemeProvider>
  );
}

export default App;
