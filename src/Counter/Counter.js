import React from "react";

export default function Counter({ color, count, black }) {
    return (
        <div className="counter">  
            <div className={'checker ' + color}></div>
            <p className={black && 'bp'}>{count}</p>
        </div>
    )
}