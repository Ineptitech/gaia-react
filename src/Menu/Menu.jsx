import { useRef } from 'react';
import { MenuItem } from '../MenuItem/MenuItem';
import './Menu.scss';

export const Menu = (props) => {
    const downloadLink = useRef(null);
    const categories = Object.keys(props.images).map(c => c.charAt(0).toUpperCase() + c.slice(1));
    const updateDownloadButton = () => {
        let el = downloadLink.current;
        el.href = props.canvas.toDataURL('image/png');
        el.download = `${props.selected.characters}, ${props.selected.eyes}, ${props.selected.misc}.png`;
    }
    const resetAll = () => {
        props.canvas.getContext('2d').clearRect(0, 0, props.canvas.width, props.canvas.height);
        categories.forEach(category => { props.update[category.toLocaleLowerCase()]({ name: "None", img: new Image() }) })
    }
    return(
        <div className="Menu">
            <div className="Menu-tray">
                <div className="Menu-buttons">
                    <a href="#" ref={downloadLink} onClick={updateDownloadButton}>
                        <button>Download</button>
                    </a>
                    <button onClick={resetAll}>Clear</button>
                    {/* <button onClick={randomizeSelection}>Randomize</button> */}
                </div>
                <div className="Menu-tabs">
                    {categories.map(category => 
                        <button onClick={() => {props.switchActiveMenu(category.toLocaleLowerCase())}}>{category}</button>
                    )}
                </div>
            </div>

                {/* Items go here, will be templated. Forward refs so we only keep one copy of the fucking thing. */}
                {Object.entries(props.images).map(([category, items]) => {
                    return(
                        <div className={`Menu-item-container ${category} ${category === props.active ? "Menu-active" : ""}`} key={category}>
                            {items.map(i => 
                            <MenuItem 
                                category={category}
                                item={i}
                                //Tell the item to put itself in the correct category in app state on click
                                onClick={props.update[category]}
                                key={i}
                            />
                            )}
                        </div>
                    )
                }
                )}
        </div>
    );
}