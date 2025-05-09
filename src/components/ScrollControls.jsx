import React, { Suspense } from "react";
import Scene from "./Scene";
import "./ScrollControls.css";

const ScrollControls = () => {
  return (
    <>
      <div id={"bg_container"} className="container">
        <div className={"wrapper"}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ScrollControls;
