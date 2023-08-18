import React, { useState } from "react";
import Board from "./Board/Board";
import Turn from "./Turn/Turn";
import Counter from "./Counter/Counter";
import Bot from "./Bot/Bot";
import { stringInd, numberInd, empty, remove } from './utils'

const mods = [
    [1, -1],  [1, 0],  [1, 1],
    [0, -1],           [0, 1],
    [-1, -1], [-1, 0], [-1, 1]
]

export default function App() {
    const [bot, setBot] = useState(false);
    const [turn, setTurn] = useState('black');
    const [board, setBoard] = useState({
        'black': ['4,4', '5,5'], 
        'white': ['4,5', '5,4'],
        'empty': empty(),
        'go': {},
    });
    // const player = ''
    
    const b = board.black.length,
          w = board.white.length,
          len = Object.keys(board.go).length;
          
    if (!len && ['black', 'white'].includes(turn)) {
        const av = {
            'black': ava(board.black, board.white),
            'white': ava(board.white, board.black),
        };
        const nturn = turn === 'black' ? 'white' : 'black';
        const brd = {...board};
        if (Object.keys(av[turn]).length) {
            brd.go = av[turn];
        } else if (Object.keys(av[nturn]).length) {
            setTurn(`no ${turn}`);
            setTimeout((av, nturn) => {
                brd.go = av[nturn];
                setTurn(nturn)
            }, 1500, av, nturn)
        } else return end()
        setBoard(brd);
    }

    // Определение результата по окончанию игры
    function end() {
        if (b > w) setTurn('Победа чёрных');
        else if (w > b) setTurn('Победа белых');
        else setTurn('Ничья')
    }

    // Доступные клетки для хода
    function ava(from, to) {
        const a = {};
        for (const ind of from) {
            const [i, j] = numberInd(ind);
            for (const m of mods) {
                const i_m = m[0], j_m = m[1];
                const c = [];
                let f = 0, check;
                do {
                    f++
                    check = stringInd(i + i_m*f, j + j_m*f);
                    c.push(check);
                } while (to.includes(check));
                c.pop();
                if (f > 1 && board.empty.includes(check)) {
                    if (a[check]) a[check].push(...c);
                    else a[check] = c;
                }
            }
        }
        return a
    }

    // Ставит фишку на поле
    function go(ind) {
        const brd = {...board};
        const nturn = turn === 'black' ? 'white' : 'black';
        for (const ch of brd.go[ind]) {
            remove(brd, ch, nturn);
            brd[turn].push(ch);
        }
        remove(brd, ind, 'empty');
        brd[turn].push(ind);
        brd.go = {};
        setBoard(brd);
        setTurn(nturn);
    }

    // Начинает игру заново
    function restart() {
        setTurn('black');
        setBoard({
            'black': ['4,4', '5,5'], 
            'white': ['4,5', '5,4'],
            'empty': empty(),
            'go': {},
        });
    }

    // Изменяет противника - компьютера или второго человека
    function changeMode() {
        setBot(!bot);
        restart();
    }

    return (
        <div id="container">
            <header>
                <Turn turn={turn}/>
            </header>
            <Board board={board} go={go} turn={{turn, bot}}/>
            <footer>
                <Counter color='white' count={w} />
                <button onClick={restart}>Начать заново</button>
                <Counter color='black' count={b} black={true} />
            </footer>
            <aside id='mode'>
                <button className={bot ? 'bot' : 'person'} onClick={changeMode}></button>
            </aside>
            {bot && <Bot brd={board} turn={turn} go={go} />}
        </div>
    )
}