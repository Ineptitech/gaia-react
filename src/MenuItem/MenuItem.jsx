import { useRef } from 'react';
import './MenuItem.scss';

export const MenuItem = (props) => {
    const itemName = props.item.split('.')[0];
    const itemRef = useRef(null);
    return(
        <img 
            className="MenuItem"
            src={`https://ipsyconh.sirv.com/Images/gaia/creator/${props.category}/${props.item}`} 
            alt={itemName}
            ref={itemRef}
            crossOrigin="anonymous"
            tabIndex="0"
            decoding="async"
            //Pass the ref and the name of the item to the app state, which then re-renders the canvas, which then draws the image. This function is already set to place it in the right category.
            onClick={() => { props.onClick({name: itemName, img: itemRef.current}) }}
        />
    );
}