import React, { Suspense } from "react";
import SceneHeadPhones from "./SceneHeadPhones";
import HeadPhoneLabels from "./HeadPhoneLabels";

const HeadPhones = () => {

  

  return (
    <>
      <div className="scene-container">
        <HeadPhoneLabels />
        <Suspense fallback={null}>
        </Suspense>
          <SceneHeadPhones />
      </div>
    </>
  );
};

export default HeadPhones;
