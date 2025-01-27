import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvide } from "./context/AuthContex";
import Footer from "./components/Footer";
import { Searchprovide } from "./context/NavSearch";

function App() {
  return (
    <>
      <AuthProvide>
        <Searchprovide>
          <Navbar />
          <main className="min-h-[calc(100vh-100px)] max-w-screen-xl mx-auto px-4 py-6 font-primary ">
            <Outlet></Outlet>
          </main>
          <Footer />
        </Searchprovide>
      </AuthProvide>
    </>
  );
}

export default App;
