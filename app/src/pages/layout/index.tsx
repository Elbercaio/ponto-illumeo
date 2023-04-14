import { Outlet } from "react-router-dom";

function Home() {

  return (
    <div className="Layout">
      <Outlet />
    </div>
  );
}

export default Home;
