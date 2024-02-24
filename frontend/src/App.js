import { Routes, Route } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import Main from "./components/Main/Main";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="" element={<Main />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

{
  /* <Route path="mypage" element={<RootMyPage />}>
<Route index element={<MyPage />} />
<Route path="qr" element={<QrPage />} />
<Route path="menulist" element={<MenuListPage />} />
<Route path="card" element={<CardPage />} />
<Route path="history" element={<HistoryPage />} />
<Route path="review" element={<ReviewPage />} />
<Route path="likemenu" element={<LikeMenuPage />} />
</Route> */
}
