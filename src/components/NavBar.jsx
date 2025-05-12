import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <>
      <ul className={"navbar"}>
        <li>
          <Link to="/">Materials</Link>
        </li>
        <li>
          <Link to="/scene-minecraft">Scene Minecraft</Link>
        </li>
        <li>
          <Link to="/debugging-tool">Debugging Tool</Link>
        </li>
        <li>
          <Link to="/html-three">Html Three</Link>
        </li>
        <li>
          <Link to="/scroll-controls-bottle">Scroll Controls Bottle</Link>
        </li>
        <li>
          <Link to="/scroll-controls-headPhones">Scroll Controls Head Phones</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
