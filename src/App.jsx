import './App.css'
import { ScrollControls } from "@react-three/drei";
import DebbuginTool from "./components/DebbuginTool";
import HtmlThree from "./components/HtmlThree";
import Materials from "./components/Materials";
import SceneMinecraft from "./components/SceneMinecraft";
import Scene from "./components/Scene";
import { Suspense } from "react";
import Labels from './components/Labels';
import {  Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import HeadPhones from './components/headPhones';
import ScenePhysics from './components/ScenePhysics';
import Scene3DModel from './components/Scene3DModel';


function App() {
  
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Materials />}/>
      <Route path="/scene-minecraft" element={<SceneMinecraft />}/>
      <Route path="/debugging-tool" element={<DebbuginTool />}/>
      <Route path="/html-three" element={<HtmlThree />}/>
      <Route path="/scroll-controls-bottle" element={
    <div id={"bg_container"} className={"container"}>
        <div className={"wrapper"}>
          <Labels />
            <Scene />
        </div>
      </div>
      }/>
      <Route path="/scroll-controls-headPhones" element={<HeadPhones />}/>
      <Route path="/physics" element={<ScenePhysics />}/>
      <Route path="/scene-3d-model" element={<Scene3DModel />}/>
    </Routes>
    </>
  );
}

export default App;
