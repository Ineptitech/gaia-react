import { useState } from 'react';
import { MenuItem } from '../MenuItem/MenuItem';
import './Menu.scss';

export const Menu = (props) => {
    const [menuExpanded, toggleMenu] = useState(false);
    const categories = Object.keys(props.images).map(c => c.charAt(0).toUpperCase() + c.slice(1));
    const resetAll = () => {
        //Clear canvas
        props.canvas.getContext('2d').clearRect(0, 0, props.canvas.width, props.canvas.height);
        //Reset all categories via update functions passed in
        Object.values(props.updateCategory).forEach(f => { f({ name: "None", img: new Image() }) })
    }
    const randomizeSelection = () => {
        //Should probably use this same code in the images themselves lmfao
        Promise.all(
            Object.entries(props.images).map(([category, items]) => {
                return new Promise((resolve, reject) => {
                    const item = items[Math.floor(Math.random() * items.length)];
                    const name = item.split('.')[0];
                    //Create the image and assign it the necessary properties
                    const img = new Image();
                    Object.assign(img, {
                        src: `https://ipsyconh.sirv.com/Images/gaia/creator/${category}/${item}`,
                        alt: name,
                        crossOrigin: "anonymous",
                        decoding: "async"
                    })
                    img.addEventListener("load", () => {resolve({name, img})})
                    img.addEventListener("error", () => {reject(new Error("Failed to load image"))})
                })
            })
        )
        .then((images) => {
            console.log(images);
            //Update each category with the corresponding loaded image
            Object.values(props.updateCategory).forEach((f, i) => { f(images[i]) })
        })
        .catch((err) => { console.log(err) })
    }
    return(
        <div className={`Menu${menuExpanded ? " Menu-open" : ""}`}>
            <div className="Menu-buttons">
                {props.showHamburger &&
                    <>
                        <div className="spacer"></div>
                        <button className="hamburger" onClick={() => {toggleMenu(!menuExpanded)}} title="Expand Nav">&equiv;</button>
                    </>
                }
                <a className="Menu-button"
                href={props.canvas?.toDataURL('image/png')}
                download={`${props.selected.characters}, ${props.selected.eyes}, ${props.selected.misc}.png`}>
                    <button>
                        <i className="gg-software-download"></i>
                    </button>
                </a>
                <button className="Menu-button" onClick={resetAll} title="Clear Canvas">
                        <i className="gg-erase"></i>
                </button>
                <button className="Menu-button" onClick={randomizeSelection} title="Randomize">
                    <i className="gg-sync"></i>
                </button>
            </div>
            <div className="Menu-tabs" role="tablist" aria-label="Category Tabs">
                {categories.map(category => 
                    <button
                    id={`${category}-tab`}
                    className="Menu-button"
                    role="tab"
                    aria-selected={(props.active === category.toLocaleLowerCase())}
                    aria-controls={`${category}-menu`} 
                    tabIndex={(props.active === category.toLocaleLowerCase()) ? "0" : "-1"}
                    onClick={() => {props.switchActiveMenu(category.toLocaleLowerCase())}}>{category}</button>
                )}
            </div>
            {/* Items go here, will be templated. Forward refs so we only keep one copy of the fucking thing. */}
            {Object.entries(props.images).map(([category, items]) => 
                <div 
                id={`${category}-menu`} 
                className="Menu-item-container" 
                role="tabpanel"
                tabIndex="0" 
                aria-labelledby={`${category}-tab`}
                hidden={(props.active !== category.toLocaleLowerCase())} 
                key={category}>
                    {items.map(i => 
                    <MenuItem 
                        category={category}
                        item={i}
                        //Tell the item to put itself in the correct category in app state on click
                        onClick={props.updateCategory[category]}
                        key={i}
                    />
                    )}
                </div>
            )}
        </div>
    );
}