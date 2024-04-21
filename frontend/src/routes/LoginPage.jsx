import Login from "../components/Login/Login";
import Footer from "../components/Navbar/Footer";
import Header2 from "../components/Navbar/Header2";

function LoginPage() {
  return (
    <main>
      <Header2 />
      <main className="col-12 p-4 d-flex flex-row justify-content-center">
        <Login />
      </main>
      <Footer />
    </main>
  );
}

export default LoginPage;
