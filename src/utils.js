// Переводит координаты клетки в строку
export function stringInd(i, j) {
    return [i,j].toString();
}

// Переводит строку координат клетки в два числа
export function numberInd(ind) {
    const[i, j] = ind.split(',')
    return [Number(i), Number(j)];
}

// Заоплняет список пустых клеток
export function empty() {
    const a = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const ind = stringInd(i, j);
            if (['4,4', '5,5', '4,5', '5,4'].includes(ind)) continue
            a.push(ind);
        }
    }
    return a;
}

// Удаляет клетку из списка 
export function remove(brd, ind, name) {
    const rem = brd[name].indexOf(ind);
    if (rem > -1) brd[name].splice(rem, 1);
}
