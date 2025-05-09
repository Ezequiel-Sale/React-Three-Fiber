import React from "react";

const Light = () => {
  return (
    <>
      <ambientLight intensity={1} color={"white"} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.4}
        color={"white"}
        castShadow={true}
        shadow-bias={-0.0001}
      />
      {/* 
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow /> 
        <pointLight position={[1, 3, 0]} intensity={2.5} color={"red"}/>
        */}
    </>
  );
};

export default Light;
