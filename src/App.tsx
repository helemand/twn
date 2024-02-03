import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => (
  <>
    <Navigation />
    <div className="container">
      <div className="inner">
        <Outlet />
      </div>
    </div>
  </>
);

export default App;
