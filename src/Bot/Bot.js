import { shuffle } from "./utils";
import { numberInd, stringInd } from '../utils';

let 
    z_a = ['1,1', '1,8', '8,1', '8,8'],
    z_b = [
        '1,2', '1,3', '1,4', '1,5', '1,6', '1,7',
        '8,2', '8,3', '8,4', '8,5', '8,6', '8,7',
        '2,1', '2,8', '3,1', '3,8', '4,1', '4,8',
        '5,1', '5,8', '6,1', '6,8', '7,1', '7,8',
    ],
    z_c = ['3,3', '3,6', '6,3', '6,6'],
    z_d = ['3,4', '3,5', '4,3', '4,6', '5,3', '5,6', '6,4', '6,5'],
    z_e = [
        '2,3', '2,4', '2,5', '2,6', 
        '3,2', '3,7', '4,2', '4,7',
        '5,2', '5,7', '6,2', '6,7',
        '7,3', '7,4', '7,5', '7,6',
    ],
    z_f = ['2,2', '2,7', '7,2', '7,7'];

export default function Bot({brd, turn, go}) {
    const color = 'white';
    const enemy = 'black'; 
    if (turn === color) setTimeout(() => {
        let way;
        way = intersection(z_a);
        if (way.length) {
            const w = way.filter(el => eat_side(el, z_b));
            if (w.length) way = w;
            return go(amount(way));
        }
        way = intersection(z_b);
        if (way.length) {
            way = way.filter(el => flip(el));
            way = way.filter(el => one(el));
            let w = way.filter(el => eat_side(el, z_b));
            if (w.length) return go(amount(w));
            way = way.filter(el => near(el));
            if (way.length) return go(amount(way));
        }
        way = intersection(z_c);
        if (way.length) {
            let w = way.filter(el => eat_side(el, z_d));
            if (w.length) return go(amount(w));
            return go(amount(way));
        }
        way = intersection(z_d);
        if (way.length) {
            return go(amount(way));
        }
        way = intersection(z_e);
        if (way.length) {
            return go(amount(way));
        }
        way = intersection(z_f);
        if (way.length) {
            return go(amount(way));
        }
        way = Object.keys(brd.go).filter(el => !z_f.includes(el));
        if (way.length) {
            return go(amount(way));
        }
        go(amount(Object.keys(brd.go)));
    }, 1000)

    // При постановки какой фишке, захватится больше чужих фишек
    function amount(way) {
        return shuffle(way).reduce((pr, cur) => {
            const bp = brd.go[pr].length,
                bc = brd.go[cur].length;
            if (bc > bp) return cur;
            return pr;
        }, way[0]);
    }

    // Захватятся ли чужие фишки у условной стенки 
    function eat_side(op, side) {
        const av = brd.go[op].filter(el => side.includes(el));
        if (av.length) return true;
        return false;
    }

    // Образуется ли вилка
    function one(op) {
        const [i, j] = numberInd(op);
        const side = [1, 8].includes(j) ? 
            [[1, 0], [-1, 0]] :
            [[0, 1], [0, -1]] ;
        for (const [is, js] of side) {
            // console.log('one');
            const ind = stringInd(i + 2 * is, j + 2 * js),
            ind_em = stringInd(i + is, j + js)
            const em = brd.empty.includes(ind_em),
            me = brd[color].includes(ind),
            con = !z_a.includes(ind);
            if (em && me && con) return false;
            // console.log('one');
        }
        return true
    }

    // Есть ли рядом чужие фишки
    function near(op) {
        const [i, j] = numberInd(op);
        const side = [1, 8].includes(j) ? 
            [[1, 0], [-1, 0]] :
            [[0, 1], [0, -1]] ;
        for (const [is, js] of side) {
            // console.log('kksks');
            const ind = stringInd(i + is, j + js);
            const en = brd[enemy].includes(ind)
            if (en) return false;
        }
        return true
    }

    // Переворачивается ли фишка перед углом
    function flip(op) {
        const pcon = z_f.filter(el => brd.go[op].includes(el));
        let con;
        switch(pcon[0]) {
            case '2,2':
                con = '1,1';
                break
            case '2,7':
                con = '1,8';
                break
            case '7,2':
                con = '8,1';
                break
            case '7,7':
                con = '8,8';
                break
        }
        if (pcon.length && !brd[color].includes(con)) return false;
        return true;
    }

    // Какие доступные ходы есть в зоне
    function intersection(zone) {
        return zone.filter(el => Object.keys(brd.go).includes(el));
    }
}

// Новая стратегия, где нужно как можно быстрее добраться до стороны и 
// захватить угол!