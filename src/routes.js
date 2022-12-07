import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Erro from "./pages/Error";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Movies />} />
        <Route path="*" element={<Erro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
