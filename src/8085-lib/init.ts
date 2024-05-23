// export let flag =  [
//     {
//         label: 'C',
//         value: false,
//     },
//     {
//         label: 'P',
//         value: false,
//     },
//     {
//         label: 'AC',
//         value: false,
//     },
//     {
//         label: 'Z',
//         value: false,
//     },
//     {
//         label: 'S',
//         value: false,
//     },
// ];
export let flag: boolean[] = new Array(5).fill(false);

export let memory: string[] = new Array(64 * 1024).fill('00');

export let pc: string = '0000';

export let registers: Map<string, number> = new Map<string, number>([
    ['A', 0x00],
    ['B', 0x00],
    ['C', 0x00],
    ['D', 0x00],
    ['E', 0x00],
    ['H', 0x00],
    ['L', 0x00],
]);

export const init = () => {
    flag = new Array(5).fill(false);
    memory = new Array(64 * 1024).fill('00');
    pc = '0000';
    registers = new Map<string, number>([
        ['A', 0x00],
        ['B', 0x00],
        ['C', 0x00],
        ['D', 0x00],
        ['E', 0x00],
        ['H', 0x00],
        ['L', 0x00],
    ]);
};

export const set = (addr: number, val: string) => {
    memory[addr] = val;
};
export const get = (addr: number) => {
    return memory[addr];
};
//TOMORROWN: REWRITE THE WHOLE GODDAMN THING BECAUSE I DECIDED TO CHANGE THE DATATYPE OF A GODDAMN ARRAY
