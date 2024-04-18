import { add, adi, sub } from '../arithmetic';

describe('ADD instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(6).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
        registers = new Map<string, number>([
            ['A', 0x00],
            ['B', 0x00],
            ['C', 0x00],
            ['D', 0x00],
            ['H', 0x00],
            ['L', 0x00],
        ]);
    });

    test('Adding two numbers', () => {
        registers.set('B', 0x08);
        registers.set('A', 0x07);
        add('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x0f);
    });
    test('Adding two numbers [one from memory]', () => {
        memory[0x2030] = 0x07;
        registers.set('A', 0x08);
        registers.set('H', 0x20);
        registers.set('L', 0x30);
        add('M', registers, flags, memory);
        expect(registers.get('A')).toBe(0x0f);
    });

    test('Adding two numbers with AC', () => {
        registers.set('B', 0x48);
        registers.set('A', 0x0f);
        add('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x57);
        expect(flags[2]).toBeTruthy();
    });

    test('Adding two numbers with AC & CY', () => {
        registers.set('B', 0xff);
        registers.set('A', 0xff);
        add('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0xfe);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
    });

    test('Adding two numbers with AC,CY,Z,P', () => {
        registers.set('B', 0xff);
        registers.set('A', 0x01);
        add('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
        expect(flags[3]).toBeTruthy();
        expect(flags[1]).toBeTruthy();
    });

    test('Adding two numbers with P,S', () => {
        registers.set('B', 0x80);
        registers.set('A', 0x01);
        add('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x81);
        expect(flags[1]).toBeTruthy();
        expect(flags[4]).toBeTruthy();
    });
    test('Throws error for invalid register', () => {
        expect(() => add('AB', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid single valued register', () => {
        expect(() => add('X', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid memory address', () => {
        registers.set('H', 0x100);
        registers.set('L', 0x20);
        expect(() => add('M', registers, flags, memory)).toThrow(
            'Invalid address',
        );
    });
});

describe('ADI instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();

    beforeEach(() => {
        flags = new Array(6).fill(false);
        registers = new Map<string, number>([
            ['A', 0x00],
            ['B', 0x00],
            ['C', 0x00],
            ['D', 0x00],
            ['H', 0x00],
            ['L', 0x00],
        ]);
    });

    test('Adding two numbers', () => {
        registers.set('A', 0x07);
        adi(0x08, registers, flags);
        expect(registers.get('A')).toBe(0x0f);
    });

    test('Adding two numbers with AC', () => {
        registers.set('A', 0x0f);
        adi(0x48, registers, flags);
        expect(registers.get('A')).toBe(0x57);
        expect(flags[2]).toBeTruthy();
    });

    test('Adding two numbers with CY', () => {
        registers.set('A', 0xff);
        adi(0xff, registers, flags);
        expect(registers.get('A')).toBe(0xfe);
        expect(flags[0]).toBeTruthy();
    });

    test('Adding two numbers with AC,CY,Z,P', () => {
        registers.set('A', 0x01);
        adi(0xff, registers, flags);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
        expect(flags[3]).toBeTruthy();
        expect(flags[1]).toBeTruthy();
    });

    test('Adding two numbers with P,S', () => {
        registers.set('A', 0x01);
        adi(0x80, registers, flags);
        expect(registers.get('A')).toBe(0x81);
        expect(flags[1]).toBeTruthy();
        expect(flags[4]).toBeTruthy();
    });

    test('Throws error for non 8bit values', () => {
        expect(() => adi(500, registers, flags)).toThrow('Invalid data');
    });
});

describe('SUB instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(6).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
        registers = new Map<string, number>([
            ['A', 0x00],
            ['B', 0x00],
            ['C', 0x00],
            ['D', 0x00],
            ['H', 0x00],
            ['L', 0x00],
        ]);
    });

    test('Subtracting two numbers', () => {
        registers.set('B', 0x07);
        registers.set('A', 0x08);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x01);
    });
    test('Subtracting two numbers [one from memory]', () => {
        memory[0x2030] = 0x07;
        registers.set('A', 0x08);
        registers.set('H', 0x20);
        registers.set('L', 0x30);
        sub('M', registers, flags, memory);
        expect(registers.get('A')).toBe(0x01);
    });

    test('Subtracting two numbers with AC', () => {
        registers.set('B', 0x27);
        registers.set('A', 0x43);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x1c);
        expect(flags[2]).toBeTruthy();
    });

    test('Subtracting two numbers with AC & CY', () => {
        registers.set('B', 0x47);
        registers.set('A', 0x23);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0xdc);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
    });

    test('Subtracting two numbers with Z,P', () => {
        registers.set('B', 0xff);
        registers.set('A', 0xff);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[1]).toBeTruthy();
        expect(flags[3]).toBeTruthy();
    });

    test('Subtracting two numbers with S', () => {
        registers.set('B', 0x0A);
        registers.set('A', 0x05);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0xFB);
        expect(flags[4]).toBeTruthy();
    });
    test('Throws error for invalid register', () => {
        expect(() => sub('AB', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid single valued register', () => {
        expect(() => sub('X', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid memory address', () => {
        registers.set('H', 0x100);
        registers.set('L', 0x20);
        expect(() => sub('M', registers, flags, memory)).toThrow(
            'Invalid address',
        );
    });
});
