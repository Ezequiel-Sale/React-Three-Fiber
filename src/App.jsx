import './App.css'
import { ScrollControls } from "@react-three/drei";
import DebbuginTool from "./components/DebbuginTool";
import HtmlThree from "./components/HtmlThree";
import Materials from "./components/Materials";
import SceneMinecraft from "./components/SceneMinecraft";
import Scene from "./components/Scene";
import { Suspense } from "react";
import Labels from './components/Labels';


function App() {
  
  return (
    <>
    {/* <SceneMinecraft /> */}
    {/* <Materials /> */}
    {/* <DebbuginTool /> */}
    {/* <HtmlThree /> */}
    <div id={"bg_container"} className={"container"}>
        <div className={"wrapper"}>
          <Labels />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
