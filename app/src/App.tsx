import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clock from "./pages/clock";
import Home from "./pages/home";
import Layout from "./pages/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clock" element={<Clock />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
