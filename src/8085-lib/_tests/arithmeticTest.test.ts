import { add, adi, dad, dcr, dcx, inr, inx, sub, sui } from '../arithmetic';

describe('ADD instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(5).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
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
        flags = new Array(5).fill(false);
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
        adi('08', registers, flags);
        expect(registers.get('A')).toBe(0x0f);
    });

    test('Adding two numbers with AC', () => {
        registers.set('A', 0x0f);
        adi('48', registers, flags);
        expect(registers.get('A')).toBe(0x57);
        expect(flags[2]).toBeTruthy();
    });

    test('Adding two numbers with CY', () => {
        registers.set('A', 0xff);
        adi('ff', registers, flags);
        expect(registers.get('A')).toBe(0xfe);
        expect(flags[0]).toBeTruthy();
    });

    test('Adding two numbers with AC,CY,Z,P', () => {
        registers.set('A', 0x01);
        adi('ff', registers, flags);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
        expect(flags[3]).toBeTruthy();
        expect(flags[1]).toBeTruthy();
    });

    test('Adding two numbers with P,S', () => {
        registers.set('A', 0x01);
        adi('80', registers, flags);
        expect(registers.get('A')).toBe(0x81);
        expect(flags[1]).toBeTruthy();
        expect(flags[4]).toBeTruthy();
    });

    test('Throws error for non 8bit values', () => {
        expect(() => adi('300', registers, flags)).toThrow('Invalid data');
    });
});

describe('SUB instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(5).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
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
        registers.set('B', 0x0a);
        registers.set('A', 0x05);
        sub('B', registers, flags, memory);
        expect(registers.get('A')).toBe(0xfb);
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

describe('SUI instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();

    beforeEach(() => {
        flags = new Array(5).fill(false);
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

    test('Subtracting two numbers', () => {
        registers.set('A', 0x08);
        sui('07', registers, flags);
        expect(registers.get('A')).toBe(0x01);
    });

    test('Subtracting two numbers with AC', () => {
        registers.set('A', 0x43);
        sui('27', registers, flags);
        expect(registers.get('A')).toBe(0x1c);
        expect(flags[2]).toBeTruthy();
    });

    test('Subtracting two numbers with AC & CY', () => {
        registers.set('A', 0x23);
        sui('47', registers, flags);
        expect(registers.get('A')).toBe(0xdc);
        expect(flags[0]).toBeTruthy();
        expect(flags[2]).toBeTruthy();
    });

    test('Subtracting two numbers with Z,P', () => {
        registers.set('A', 0xff);
        sui('ff', registers, flags);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[1]).toBeTruthy();
        expect(flags[3]).toBeTruthy();
    });

    test('Subtracting two numbers with S', () => {
        registers.set('A', 0x05);
        sui('0a', registers, flags);
        expect(registers.get('A')).toBe(0xfb);
        expect(flags[4]).toBeTruthy();
    });

    test('Throws error for non 8bit values', () => {
        expect(() => sui('500', registers, flags)).toThrow('Invalid data');
    });
});

describe('INR instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(5).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
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

    test('Increment any register', () => {
        registers.set('A', 0xff);
        inr('A', registers, flags, memory);
        expect(registers.get('A')).toBe(0x00);
        expect(flags[0]).toBeFalsy();
    });

    test('Increment memory address', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x40);
        memory[0x2040] = 0xf0;
        inr('M', registers, flags, memory);
        expect(memory[0x2040]).toBe(0xf1);
        expect(flags[0]).toBeFalsy();
    });

    test('Throws error for invalid register', () => {
        expect(() => inr('AB', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });

    test('Throws error for invalid single character register', () => {
        expect(() => inr('X', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid memory address', () => {
        registers.set('H', 0x200);
        registers.set('L', 0x40);
        expect(() => inr('M', registers, flags, memory)).toThrow(
            'Invalid address',
        );
    });
});

describe('DCR instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();
    let memory = new Uint8Array(64 * 1024).fill(0x00);

    beforeEach(() => {
        flags = new Array(5).fill(false);
        memory = new Uint8Array(64 * 1024).fill(0x00);
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

    test('Decrement any register', () => {
        registers.set('A', 0x00);
        dcr('A', registers, flags, memory);
        expect(registers.get('A')).toBe(0xff);
        expect(flags[0]).toBeFalsy();
    });

    test('Decrement memory address', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x40);
        memory[0x2040] = 0x70;
        dcr('M', registers, flags, memory);
        expect(memory[0x2040]).toBe(0x6f);
        expect(flags[0]).toBeFalsy();
    });

    test('Throws error for invalid register', () => {
        expect(() => dcr('AB', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });

    test('Throws error for invalid single character register', () => {
        expect(() => dcr('X', registers, flags, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid memory address', () => {
        registers.set('H', 0x200);
        registers.set('L', 0x40);
        expect(() => dcr('M', registers, flags, memory)).toThrow(
            'Invalid address',
        );
    });
});

describe('INX instruction', () => {
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

    test('Incrementing register pair HL', () => {
        registers.set('H', 0x30);
        registers.set('L', 0xff);
        inx('H', registers);
        expect(registers.get('H')).toBe(0x31);
        expect(registers.get('L')).toBe(0x00);
    });

    test('Throws error for invalid register pair', () => {
        expect(() => inx('A', registers)).toThrow('Invalid register pair');
    });

    test('Throws error for invalid register', () => {
        expect(() => inx('BC', registers)).toThrow('Invalid register');
    });
});

describe('DCX instruction', () => {
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

    test('Decrementing register pair HL', () => {
        registers.set('H', 0x40);
        registers.set('L', 0x00);
        dcx('H', registers);
        expect(registers.get('H')).toBe(0x3f);
        expect(registers.get('L')).toBe(0xff);
    });

    test('Throws error for invalid register pair', () => {
        expect(() => dcx('A', registers)).toThrow('Invalid register pair');
    });

    test('Throws error for invalid register', () => {
        expect(() => dcx('BC', registers)).toThrow('Invalid register');
    });
});

describe('DAD instruction', () => {
    let flags: boolean[] = [];
    let registers: Map<string, number> = new Map();

    beforeEach(() => {
        flags = new Array(5).fill(false);
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

    test('Adding register pair with HL', () => {
        registers.set('B', 0x40);
        registers.set('C', 0x30);
        registers.set('H', 0x20);
        registers.set('L', 0x50);

        dad('B', registers, flags);

        expect(registers.get('H')).toBe(0x60);
        expect(registers.get('L')).toBe(0x80);
    });

    test('Adding register pair sets CY', () => {
        registers.set('B', 0x40);
        registers.set('C', 0x30);
        registers.set('H', 0xff);
        registers.set('L', 0x23);

        dad('B', registers, flags);

        expect(registers.get('H')).toBe(0x3f);
        expect(registers.get('L')).toBe(0x53);
        expect(flags[0]).toBeTruthy();
    });

    test('Adding HL itself', () => {
        registers.set('H', 0x30);
        registers.set('L', 0xf5);

        dad('H', registers, flags);

        expect(registers.get('H')).toBe(0x61);
        expect(registers.get('L')).toBe(0xea);
    });
    test('Throws error for invalid register pair', () => {
        expect(() => dad('A', registers, flags)).toThrow(
            'Invalid register pair',
        );
    });

    test('Throws error for invalid register', () => {
        expect(() => dad('BC', registers, flags)).toThrow('Invalid register');
    });
});
