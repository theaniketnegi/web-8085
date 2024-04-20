import {
    lda,
    lhld,
    lxi,
    mov,
    mvi,
    shld,
    sta,
    stax,
    xchg,
} from '../load_and_store';

describe('MOV instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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

    test('Moving value at B to A', () => {
        registers.set('B', 0xf2);
        mov('A', 'B', registers, memory);
        expect(registers.get('A')).toBe(0xf2);
    });
    test('Moving value at M to A', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        memory[0x2050] = 'f0';
        mov('A', 'M', registers, memory);
        expect(registers.get('A')).toBe(0xf0);
    });
    test('Moving value at A to M', () => {
        registers.set('A', 0xf0);
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        mov('M', 'A', registers, memory);
        expect(memory[0x2050]).toBe('f0');
    });
    test('Throws error for invalid register', () => {
        expect(() => mov('AB', 'M', registers, memory)).toThrow(
            'Invalid register(s)',
        );
        expect(() => mov('F', 'G', registers, memory)).toThrow(
            'Invalid register(s)',
        );
        expect(() => mov('X', 'M', registers, memory)).toThrow(
            'Invalid register',
        );
        expect(() => mov('M', 'X', registers, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid address', () => {
        registers.set('H', 0x30);
        registers.set('L', 0xff0);
        expect(() => mov('M', 'A', registers, memory)).toThrow(
            'Invalid address',
        );
    });
    test('Throws error for invalid data', () => {
        registers.set('H', 0x30);
        registers.set('L', 0xff);
        memory[0x30ff] = 'MOV';

        expect(() => mov('A', 'M', registers, memory)).toThrow('Invalid data');

        memory[0x30ff] = 'FFFF';
        expect(() => mov('A', 'M', registers, memory)).toThrow('Invalid data');
        memory[0x30ff] = 'A';
        expect(() => mov('A', 'M', registers, memory)).toThrow('Invalid data');
    });
});

describe('MVI instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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

    test('Moving immediate data to A', () => {
        mvi('A', 'ff', registers, memory);
        expect(registers.get('A')).toBe(0xff);
    });
    test('Moving immediate data to memory address', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        mvi('M', 'f3', registers, memory);
        expect(memory[0x2050]).toBe('f3');
    });

    test('Throws error for invalid immediate data', () => {
        expect(() => mvi('A', 'ff1', registers, memory)).toThrow(
            'Invalid data',
        );
    });
    test('Throws error for invalid register', () => {
        expect(() => mvi('K', 'ff', registers, memory)).toThrow(
            'Invalid register',
        );
    });
    test('Throws error for invalid address', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x300);
        expect(() => mvi('M', 'f0', registers, memory)).toThrow(
            'Invalid address',
        );
    });
});

describe('LXI instruction', () => {
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

    test('Loading 16-bit data to register pair', () => {
        lxi('H', 'facd', registers);
        expect(registers.get('H')).toBe(0xfa);
        expect(registers.get('L')).toBe(0xcd);
    });

    test('Throws error for invalid 16-bit data', () => {
        expect(() => lxi('H', '20', registers)).toThrow('Invalid data');
    });
    test('Throws error for invalid register pair', () => {
        expect(() => lxi('A', '2099', registers)).toThrow(
            'Invalid register pair',
        );
        expect(() => lxi('BC', '2000', registers)).toThrow(
            'Invalid register pair',
        );
    });
});

describe('LDA instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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

    test('Load value at memory location to A', () => {
        memory[0x2050] = '40';
        lda('2050', registers, memory);

        expect(registers.get('A')).toBe(0x40);
    });

    test('Throws error for invalid address', () => {
        expect(() => lda('20', registers, memory)).toThrow('Invalid address');
        expect(() => lda('204', registers, memory)).toThrow('Invalid address');
        expect(() => lda('XCSD', registers, memory)).toThrow('Invalid address');
    });
    test('Throws error for invalid data', () => {
        memory[0x30ff] = 'MOV';

        expect(() => lda('30ff', registers, memory)).toThrow('Invalid data');

        memory[0x30ff] = 'FFFF';
        expect(() => lda('30ff', registers, memory)).toThrow('Invalid data');
        memory[0x30ff] = 'A';
        expect(() => lda('30ff', registers, memory)).toThrow('Invalid data');
    });
});

describe('STA instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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

    test('Store value of A at memory location', () => {
        registers.set('A', 0x43);
        sta('2050', registers, memory);

        expect(memory[0x2050]).toBe('43');
    });

    test('Throws error for invalid address', () => {
        expect(() => sta('20', registers, memory)).toThrow('Invalid address');
        expect(() => sta('204', registers, memory)).toThrow('Invalid address');
        expect(() => sta('XCSD', registers, memory)).toThrow('Invalid address');
    });
});

describe('LHLD instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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
    test('Loading value at memory locations to HL', () => {
        memory[0x2050] = '42';
        memory[0x2051] = '31';

        lhld('2050', registers, memory);

        expect(registers.get('L')).toBe(0x42);
        expect(registers.get('H')).toBe(0x31);
    });

    test('Throws error for invalid address', () => {
        expect(() => lhld('20', registers, memory)).toThrow('Invalid address');
        expect(() => lhld('204', registers, memory)).toThrow('Invalid address');
        expect(() => lhld('XCSD', registers, memory)).toThrow(
            'Invalid address',
        );
    });

    test('Throws error for invalid data', () => {
        memory[0x30ff] = 'MOV';
        expect(() => lhld('30ff', registers, memory)).toThrow('Invalid data');
        memory[0x30ff] = 'FFFF';
        expect(() => lhld('30ff', registers, memory)).toThrow('Invalid data');
        memory[0x30ff] = 'A';
        expect(() => lhld('30ff', registers, memory)).toThrow('Invalid data');
    });
});

describe('SHLD instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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
    test('Storing value of HL at memory location', () => {
        registers.set('H', 0x50);
        registers.set('L', 0x20);

        shld('2050', registers, memory);

        expect(memory[0x2050]).toBe('20');
        expect(memory[0x2051]).toBe('50');
    });

    test('Throws error for invalid address', () => {
        expect(() => shld('20', registers, memory)).toThrow('Invalid address');
        expect(() => shld('204', registers, memory)).toThrow('Invalid address');
        expect(() => shld('XCSD', registers, memory)).toThrow(
            'Invalid address',
        );
    });
});

describe('STAX instruction', () => {
    let registers: Map<string, number> = new Map();
    let memory = new Array(64 * 1024).fill('00');

    beforeEach(() => {
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

    test('Store value of A to memory address formed by register pair', () => {
        registers.set('A', 0x50);
        registers.set('H', 0x20);
        registers.set('L', 0x50);
        stax('H', registers, memory);

        expect(memory[0x2050]).toBe('50');
    });

    test('Throws error for invalid register pair', () => {
        expect(() => stax('A', registers, memory)).toThrow(
            'Invalid register pair',
        );
        expect(() => stax('BC', registers, memory)).toThrow(
            'Invalid register pair',
        );
    });

    test('Throws error for invalid address', () => {
        registers.set('H', 0x200);
        registers.set('L', 0x300);
        registers.set('A', 0x30);

        expect(() => stax('H', registers, memory)).toThrow('Invalid address');
    });
});

describe('XCHG instruction', () => {
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
    test('Exchanges value of H and D, L and E registers', () => {
        registers.set('H', 0x20);
        registers.set('L', 0x30);
        registers.set('D', 0x10);
        registers.set('E', 0xff);

        xchg(registers);

        expect(registers.get('H')).toBe(0x10);
        expect(registers.get('L')).toBe(0xff);
        expect(registers.get('D')).toBe(0x20);
        expect(registers.get('E')).toBe(0x30);
    });
});
