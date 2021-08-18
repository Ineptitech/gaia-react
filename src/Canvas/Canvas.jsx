import React, { useEffect } from 'react';
import './Canvas.scss';

export const Canvas = React.forwardRef((props, ref) => {
    
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        //Reset the canvas
        ctx.clearRect(0, 0, props.size, props.size);
        //Draw selected items
        for (const i of ["characters", "eyes", "misc"]) {
            ctx.drawImage(props[i], 0, 0, props.size, props.size)
        }
    });

    return <canvas width={props.size} height={props.size} ref={ref}></canvas>;
})

export default Canvas