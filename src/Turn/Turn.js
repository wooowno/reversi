import React from "react";

export default function Turn({turn}) {
    let text = ['white', 'black'].includes(turn) ? 
        'Ход ' + (turn === 'white' ? 'белых' : 'чёрных') :
        turn;
    if (turn.startsWith('no')) {
        const pass = turn.split(' ');
        text = `У ${ pass[1] === 'black' ? 'чёрных' : 'белых' } нет ходов`;
    }
    return (
        <p id='turn'>{text}</p>
    )
}