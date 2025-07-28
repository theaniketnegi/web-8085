import { Flag } from './init';
import { opcodes } from './opcodes';

export const convertToNum = (data: string) => {
    return parseInt(data, 16);
};
export const validateRegister = (reg: string) => {
    return (
        reg === 'A' ||
        reg === 'B' ||
        reg === 'C' ||
        reg === 'D' ||
        reg === 'E' ||
        reg === 'H' ||
        reg === 'L' ||
        reg == 'M'
    );
};

export const validateMemRegister = (reg: string) => {
    return 'M' === reg;
};

export const validateAddr = (addr: number) => {
    return addr >= 0x0000 && addr <= 0xffff;
};

export const validateAddrString = (addr: string) => {
    const regex = /^[0-9A-F]{4}$/i;
    return regex.test(addr);
};
export const validateRegPair = (reg: string) => {
    return reg === 'B' || reg === 'D' || reg === 'H';
};

export const validateImmediateData = (data: number) => {
    return data >= 0x00 && data <= 0xff;
};
export const validateDataString = (data: string) => {
    const regex = /^[0-9A-F]{2}$/i;
    return regex.test(data);
};

export const complement = (data: number) => {
    return 0xff - data;
};

export const twosComplement = (data: number, flag: boolean[]) => {
    const comp = complement(data);
    const result = hexAdd(comp, 0x01, flag);
    return result;
};

export const twosComplement16 = (data: number, flag: boolean[]) => {
    const comp = 0xffff - data;
    const result = hexAdd16(comp, 0x0001, flag, false);
    return result;
};

export const hexAdd = (valA: number, valB: number, flag: boolean[]) => {
    let result = valA + valB;
    let carry = false;
    let auxCarry = false;

    if (result > 255) {
        carry = true;
        result = result & 0xff;
    }

    const lNibbleA = valA & 0x0f;
    const lNibbleB = valB & 0x0f;

    const auxSum = lNibbleA + lNibbleB;
    if (auxSum > 0x0f) auxCarry = true;

    let num = result;
    let count = 0;
    while (num) {
        count += num & 1;
        num >>= 1;
    }
    flag[Flag.Carry] = carry;
    flag[Flag.Parity] = !(count & 1);
    flag[Flag.AuxCarry] = auxCarry;
    flag[Flag.Zero] = result === 0;
    flag[Flag.Sign] = result >= 0x80 && result <= 0xff;
    return result;
};

export const hexSub = (valA: number, valB: number, flag: boolean[]) => {
    const result = hexAdd(valA, twosComplement(valB, flag), flag);
    flag[Flag.Carry] = false;
    flag[Flag.AuxCarry] = false;

    flag[Flag.Carry] = valA - valB < 0;

    const lNibbleA = valA & 0x0f;
    const lNibbleB = valB & 0x0f;

    flag[Flag.AuxCarry] = lNibbleA - lNibbleB < 0;

    return result;
};

export const hexAdd16 = (
    valA: number,
    valB: number,
    flag: boolean[],
    isDAD: boolean,
) => {
    let result = valA + valB;
    if (result > 0xffff) {
        if (isDAD) flag[Flag.Carry] = true;
        result = result & 0xffff;
    }

    return result;
};

export const compare = (valA: number, valB: number, flag: boolean[]) => {
    if (valA == valB) {
        flag[Flag.Zero] = true;
    } else if (valA < valB) {
        flag[Flag.Carry] = true;
    } else {
        flag[Flag.Carry] = false;
        flag[Flag.Zero] = false;
    }
};

export const swap = (
    regA: string,
    regB: string,
    registers: Map<string, number>,
) => {
    registers.set(regA, registers.get(regA)! ^ registers.get(regB)!);
    registers.set(regB, registers.get(regA)! ^ registers.get(regB)!);
    registers.set(regA, registers.get(regA)! ^ registers.get(regB)!);
};

export const validateLine = (line: string, labelMap: Map<string, string>) => {
    const args = line.split(/[, ]/).filter((item) => item !== '');
    if (validateInstruction(args)) {
        let flag = true;
        if (args.length > 1) {
            for (let i = 1; i < args.length; i++) {
                if (labelMap.has(args[i].toUpperCase())) {
                    continue;
                }
                switch (args[i].length) {
                    case 1:
                        flag = validateRegister(args[i]);
                        break;
                    case 2:
                        flag =
                            validateImmediateData(convertToNum(args[i])) &&
                            validateDataString(args[i]);
                        break;
                    case 4:
                        flag =
                            validateAddr(convertToNum(args[i])) &&
                            validateAddrString(args[i]);
                        break;
                    default:
                        flag = false;
                        break;
                }
                if (!flag) return false;
            }
        }
        return true;
    }
    return false;
};

export const validateInstruction = (args: string[]) => {
    if (args.length === 0 || args.length > 3) return false;
    const oneArgs = ['HLT', 'CMA', 'XCHG'];
    const twoArgs = [
        'CMP',
        'JMP',
        'JC',
        'JNC',
        'JZ',
        'JNZ',
        'LDA',
        'STA',
        'LHLD',
        'SHLD',
        'STAX',
        'ADD',
        'ADI',
        'SUB',
        'SUI',
        'INR',
        'INX',
        'DCR',
        'DCX',
        'DAD',
    ];
    const threeArgs = ['MOV', 'MVI', 'LXI'];

    if (args.length === 1) return oneArgs.includes(args[0]);
    if (args.length === 2) return twoArgs.includes(args[0]);
    if (args.length === 3) return threeArgs.includes(args[0]);
    return false;
};

export const updatePC = (
    pc: string,
    memory: string[],
    opcode: string,
    data: string | undefined,
    size: number,
) => {
    const pcHex = convertToNum(pc);
    let result = pcHex;

    if (size === 1) {
        memory[result] = opcode;
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
    } else if (size === 2) {
        memory[result] = opcode;
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
        if (!data) throw Error('Missing data');
        memory[result] = data;
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
    } else if (size === 3) {
        memory[result] = opcode;
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
        if (
            !data ||
            !(validateAddr(parseInt(data, 16)) && validateAddrString(data))
        ) {
            throw Error('Missing data');
        }
        memory[result] = data.substring(2, 4);
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
        memory[result] = data.substring(0, 2);
        result = hexAdd16(result, 0x0001, new Array(5).fill(false), false);
    } else {
        throw Error('Invalid instruction');
    }
    pc = result.toString(16);
    return pc;
};

export const isBranching = (opcode: string): boolean => {
    const opcodeArray = ['JZ', 'JNC', 'JC', 'JNZ', 'JMP'].map(
        (instr) => opcodes[instr].opcode,
    );
    return opcodeArray.includes(opcode.toUpperCase());
};
