import Scene from "./Scene";
import "./ScrollControls.css";

const ScrollControls = () => {
  return (
    <>
      <div id={"bg_container"} className="container">
        <div className={"wrapper"}>
            <Scene />
        </div>
      </div>
    </>
  );
};

export default ScrollControls;
