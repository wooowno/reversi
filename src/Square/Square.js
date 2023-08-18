import React, { useState } from "react";

export default function Square({board, ind, go, turn}) {
    const [style, setStyle] = useState('');
    
    function change(name) {
        const a = ['go', 'empty'].includes(style),
            b = style === '',
            c = board[name].includes(ind),
            d = style !== name;
        if ((a || b) && c && d) setStyle(name);
    }
    change('white');
    change('black');
    if (Object.keys(board.go).includes(ind) && style !== 'go') setStyle('go');
    if (board.empty.includes(ind) && !Object.keys(board.go).includes(ind) && style !== 'empty') setStyle('empty');
    
    if (style === 'white' && board.black.includes(ind)) {
        setStyle('to-black');
        setTimeout(() => setStyle('black'), 250);
    }
    if (style === 'black' && board.white.includes(ind)) {
        setStyle('to-white');
        setTimeout(() => setStyle('white'), 250);
    }

    return <button 
        onClick={() => {
            if (turn.bot && turn.turn === 'white') return;
            if (style === 'go') go(ind);
        }}
    >
        {!['go', 'empty'].includes(style) && <div className={'checker ' + style}></div>}
        {style === 'go' && <div className='go'></div>}
    </button>
}
