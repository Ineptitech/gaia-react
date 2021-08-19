import './App.css';
import { Menu } from './Menu/Menu';
import { Canvas } from './Canvas/Canvas';
import { useEffect, useState, useRef } from 'react';
function App() {

  //Item state
  const [characters, setCharacters] = useState({name: "None", img: new Image()});
  const [eyes, setEyes] = useState({name: "None", img: new Image()});
  const [misc, setMisc] = useState({name: "None", img: new Image()});

  //Store all available images
  const [images, storeImages] = useState({});

  //Switching menus
  const [activeMenu, switchActiveMenu] = useState("characters");

  //Canvas size 
  const [size, updateSize] = useState(Math.min(window.innerWidth, window.innerHeight));
  const canvasRef = useRef(null);
  
  

  useEffect(() => {
    window.addEventListener("resize", () => {updateSize(Math.min(window.innerWidth, window.innerHeight))})
    //Retrieve images
    fetch("http://localhost/clientwork/gaia/public/cache.json")
    .then(r => r.json())
    .then(data => {storeImages(data)});
  }, [])

  return (
    <div className="App">
      <Menu canvas={canvasRef.current} images={images} active={activeMenu} switchActiveMenu={switchActiveMenu} showHamburger={(window.matchMedia("(max-width: calc(100vmin + 300px))").matches)} updateCategory={{characters: setCharacters, eyes: setEyes, misc: setMisc }} selected={{characters: characters.name, eyes: eyes.name, misc: misc.name}} />
      <Canvas ref={canvasRef} characters={characters.img} eyes={eyes.img} misc={misc.img} size={size} />
    </div>
  );
}

export default App;
