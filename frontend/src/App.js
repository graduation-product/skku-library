import { Routes, Route } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import Main from "./components/Main/Main";
import Rank from "./components/Main/Rank";
import Search from "./components/Main/Search";
import Review from "./components/Main/Review";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="" element={<Main />} />
        <Route path="rank" element={<Rank />} />
        <Route path="search" element={<Search />} />
        <Route path="review" element={<Review />} />
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
