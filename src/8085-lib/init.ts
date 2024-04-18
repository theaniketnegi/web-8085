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
export let flag = new Array(6).fill(false);

export let memory = new Uint8Array(64 * 1024).fill(0x00);

export let registers = new Map<string, number>([
    ['A', 0x00],
    ['B', 0x00],
    ['C', 0x00],
    ['D', 0x00],
    ['H', 0x00],
    ['L', 0x00],
]);
