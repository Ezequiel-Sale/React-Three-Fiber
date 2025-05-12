import React, { Suspense } from "react";
import SceneHeadPhones from "./SceneHeadPhones";
import HeadPhoneLabels from "./HeadPhoneLabels";

const HeadPhones = () => {

  

  return (
    <>
      <div className="scene-container">
        <HeadPhoneLabels />
        <Suspense fallback={null}>
          <SceneHeadPhones />
        </Suspense>
      </div>
    </>
  );
};

export default HeadPhones;
