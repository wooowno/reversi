import React from "react";
import Square from "../Square/Square";

export default function Board({board: position, go, turn}) {
    let board = new Array(8).fill(0);
    let i = 1;
    board = board.map(_ => {
        let row = new Array(8).fill(0);
        let j = 1;
        row = row.map(_ => {
            const ind = [i, j].toString();
            return <td key={j++}><Square board={position} ind={ind} go={go} turn={turn}/></td>
        })
        return <tr className="row" key={i++}>{row}</tr>
    })
    return <table><tbody>{board}</tbody></table>
}