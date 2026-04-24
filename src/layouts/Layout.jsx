import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      <main className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;