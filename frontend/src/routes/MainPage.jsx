import Header from "../components/Navbar/Header/Header";
import Footer from "../components/Navbar/Footer/Footer";
import { Outlet } from "react-router-dom";
function LoginPage() {
  return (
    <main>
      <Header />
      <main className="col-12 p-4 d-flex flex-row justify-content-center">
        <Outlet />
      </main>
      <Footer />
    </main>
  );
}

export default LoginPage;
