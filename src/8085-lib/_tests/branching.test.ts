import { jc, jmp, jnc, jnz, jz } from '../branching';

describe('JMP instruction', () => {
    test('JMP 2053 changes PC to that value', () => {
        let pc = '2050';
        pc = jmp('2053');
        expect(pc).toBe('2053');
    });

    test('Throws error for invalid address', () => {
        expect(() => jmp('205')).toThrow('Invalid address');
    });
});

describe('JNC instruction', () => {
    let pc = '2050';
    let flags: boolean[] = [];
    beforeEach(() => {
        pc = '2050';
        flags = new Array(5).fill(false);
    });
    test('JNC 2060 changes PC to address if CY is unset', () => {
        flags[0] = false;
        pc = jnc('2060', pc, flags);
        expect(pc).toBe('2060');
    });
    test('JNC increments PC to next instruction if CY is set', () => {
        flags[0] = true;
        pc = jnc('2060', pc, flags);
        expect(pc).toBe('2053');
    });
    test('Throws error for invalid address', () => {
        expect(() => jnc('205', pc, flags)).toThrow('Invalid address');
    });
});

describe('JC instruction', () => {
    let pc = '2050';
    let flags: boolean[] = [];
    beforeEach(() => {
        pc = '2050';
        flags = new Array(5).fill(false);
    });
    test('JC 2060 changes PC to address if CY is set', () => {
        flags[0] = true;
        pc = jc('2060', pc, flags);
        expect(pc).toBe('2060');
    });
    test('JC increments PC to next instruction if CY is unset', () => {
        flags[0] = false;
        pc = jc('2060', pc, flags);
        expect(pc).toBe('2053');
    });
    test('Throws error for invalid address', () => {
        expect(() => jc('205', pc, flags)).toThrow('Invalid address');
    });
});

describe('JZ instruction', () => {
    let pc = '2050';
    let flags: boolean[] = [];
    beforeEach(() => {
        pc = '2050';
        flags = new Array(5).fill(false);
    });
    test('JZ 2060 changes PC to address if Z is set', () => {
        flags[3] = true;
        pc = jz('2060', pc, flags);
        expect(pc).toBe('2060');
    });
    test('JZ increments PC to next instruction if Z is unset', () => {
        flags[3] = false;
        pc = jc('2060', pc, flags);
        expect(pc).toBe('2053');
    });
    test('Throws error for invalid address', () => {
        expect(() => jz('205', pc, flags)).toThrow('Invalid address');
    });
});

describe('JNZ instruction', () => {
    let pc = '2050';
    let flags: boolean[] = [];
    beforeEach(() => {
        pc = '2050';
        flags = new Array(5).fill(false);
    });
    test('JNZ 2060 changes PC to address if Z is unset', () => {
        flags[3] = false;
        pc = jnz('2060', pc, flags);
        expect(pc).toBe('2060');
    });
    test('JNZ increments PC to next instruction if Z is set', () => {
        flags[3] = true;
        pc = jnz('2060', pc, flags);
        expect(pc).toBe('2053');
    });
    test('Throws error for invalid address', () => {
        expect(() => jnz('205', pc, flags)).toThrow('Invalid address');
    });
});
