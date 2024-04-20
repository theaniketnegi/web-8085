import { cma, cmp } from '../logical';

describe('CMA instruction', () => {
    let registers: Map<string, number> = new Map();
    beforeEach(() => {
        registers = new Map<string, number>([
            ['A', 0x00],
            ['B', 0x00],
            ['C', 0x00],
            ['D', 0x00],
            ['E', 0x00],
            ['H', 0x00],
            ['L', 0x00],
        ]);
    });

    test('CMA of A gives complement', () => {
        registers.set('A', 0x50);
        cma(registers);
        expect(registers.get('A')).toBe(0xaf);
    });
});

describe('CMP instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
        flags = new Array(5).fill(false);
        memory = new Array(64 * 1024).fill('00');
        registers = new Map<string, number>([
            ['A', 0x00],
            ['B', 0x00],
            ['C', 0x00],
            ['D', 0x00],
            ['E', 0x00],
            ['H', 0x00],
            ['L', 0x00],
        ]);
    });

    test('Value of register is less than value of A', () => {
        registers.set('B', 0x30);
        registers.set('A', 0x40);
        cmp('B', registers, flags, memory);
        expect(flags[0]).toBeFalsy();
        expect(flags[3]).toBeFalsy();
    });
    test('Value of register is equal to value of A', () => {
        registers.set('B', 0x30);
        registers.set('A', 0x30);
        cmp('B', registers, flags, memory);
        expect(flags[3]).toBeTruthy();
    });

    test('Value of register is greater than value of A', () => {
        registers.set('B', 0x50);
        registers.set('A', 0x30);
        cmp('B', registers, flags, memory);
        expect(flags[0]).toBeTruthy();
    });

    test('Value at address is less than value of A', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        memory[0x2050] = '30';
        registers.set('A', 0x40);
        cmp('M', registers, flags, memory);
        expect(flags[0]).toBeFalsy();
        expect(flags[3]).toBeFalsy();
    });
    test('Value at address is equal to value of A', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        memory[0x2050] = '30';
        registers.set('A', 0x30);
        cmp('M', registers, flags, memory);
        expect(flags[3]).toBeTruthy();
    });

    test('Value at address is greater than value of A', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        memory[0x2050] = '50';
        registers.set('A', 0x30);
        cmp('M', registers, flags, memory);
        expect(flags[0]).toBeTruthy();
    });

    test('Throws error for invalid register', () => {
        expect(() => cmp('X', registers, flags, memory)).toThrow(
            'Invalid register',
        );
        expect(() => cmp('AB', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });

    test('Throws error for invalid data', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        memory[0x2050] = '5';
        expect(() => cmp('M', registers, flags, memory)).toThrow(
            'Invalid data',
        );
        memory[0x2050] = '7FF';
        expect(() => cmp('M', registers, flags, memory)).toThrow(
            'Invalid data',
        );
        memory[0x2050] = 'MOV';
        expect(() => cmp('M', registers, flags, memory)).toThrow(
            'Invalid data',
        );
    });
});
