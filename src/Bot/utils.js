export function shuffle(arr) {
    let cind = arr.length, rind;
    while (cind !== 0) {
        rind = Math.floor(Math.random() * cind);
        cind--;
        [arr[cind], arr[rind]] = [arr[rind], arr[cind]];
    }
    return arr;
}
