import Header from "../components/Navbar/Header/Header";
import Footer from "../components/Navbar/Footer/Footer";
import { Outlet } from "react-router-dom";
function LoginPage() {
  return (
    <main>
      <Header />
      <main className="w-100">
        <Outlet />
      </main>
      <Footer />
    </main>
  );
}

export default LoginPage;
