import React, { Suspense } from "react";
import Labels from "./Labels";
import Scene from "./Scene";

const BottleScene = () => {
  return (
    <div>
      <div id={"bg_container"} className={"container"}>
        <div className={"wrapper"}>
            <Labels />
            <Scene />
        </div>
      </div>
    </div>
  );
};

export default BottleScene;
