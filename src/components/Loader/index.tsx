import Svg from "../../assets/imgs/loader.svg";
import "./index.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={Svg} className="loader" alt="loader" title="loader" />
    </div>
  );
};

export default Loader;
