import { add, adi, dad, dcr, dcx, inr, inx, sub, sui } from './arithmetic';
import { jc, jmp, jnc, jnz, jz } from './branching';
import { flag, memory, registers } from './init';
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
} from './load_and_store';
import { cma, cmp } from './logical';
import { opcodeKey, opcodes } from './opcodes';
import {
    convertToNum,
    hexAdd16,
    instructionSize,
    updatePC,
    validateAddr,
    validateAddrString,
    validateLine,
} from './utils';

export const execute = (code: string, pc: string) => {
    const codeArr = code.trim().split('\n');
    let start = convertToNum(pc);
    let lastPc = '';
    codeArr.forEach((line) => {
        if (validateAddr(parseInt(pc, 16)) && validateAddrString(pc)) {
            if (validateLine(line)) {
                memory[convertToNum(pc)] = matchInstructions(line);
                lastPc = pc;
                pc = updatePC(pc, memory);
            } else {
                throw Error('Invalid instruction');
            }
        } else {
            throw Error('Invalid value at PC');
        }
    });
    memory[convertToNum(pc)] = '00';
    pc = lastPc;
    const end = convertToNum(pc);

    while (start <= end) {
        start = process(memory[start], start, memory, flag, registers);
    }

    return {
        registers,
        memory,
        flag,
    };
};

const matchInstructions = (line: string): string => {
    const args: string[] = line.split(/[, ]/);
    if (opcodes[args[0] as opcodeKey]) {
        return opcodes[args[0] as opcodeKey].opcode;
    } else if (opcodes[line as opcodeKey]) {
        return opcodes[line as opcodeKey].opcode;
    } else {
        const pattern = /^([A-Z]+)\s[A-Z],\s*(\w+)$/;
        const match = line.match(pattern);
        if (match) {
            const instruction = match[1];
            if (opcodes[instruction as opcodeKey]) {
                return opcodes[instruction as opcodeKey].opcode;
            }
        }
    }
    return '00';
};

const process = (
    instruction: string,
    pc: number,
    memory: string[],
    flag: boolean[],
    registers: Map<string, number>,
) => {
    const args = instruction.split(/[, ]/);
    const dummy = new Array(5).fill(false);

    if (args[0] === 'MOV') {
        mov(args[1], args[2], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'MVI') {
        mvi(args[1], args[2], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'LXI') {
        lxi(args[1], args[2], registers);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'LDA') {
        lda(args[1], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'STA') {
        sta(args[1], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'LHLD') {
        lhld(args[1], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'SHLD') {
        shld(args[1], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'STAX') {
        stax(args[1], registers, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'XCHG') {
        xchg(registers);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'ADD') {
        add(args[1], registers, flag, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'ADI') {
        adi(args[1], registers, flag);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'SUB') {
        sub(args[1], registers, flag, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'SUI') {
        sui(args[1], registers, flag);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'INR') {
        inr(args[1], registers, flag, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'INX') {
        inx(args[1], registers);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'DCX') {
        dcx(args[1], registers);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'DCR') {
        dcr(args[1], registers, flag, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'DAD') {
        dad(args[1], registers, flag);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'CMA') {
        cma(registers);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'CMP') {
        cmp(args[1], registers, flag, memory);
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else if (args[0] === 'JMP') {
        pc = convertToNum(jmp(args[1]));
    } else if (args[0] === 'JC') {
        pc = convertToNum(jc(args[1], pc.toString(16), flag));
    } else if (args[0] === 'JNC') {
        pc = convertToNum(jnc(args[1], pc.toString(16), flag));
    } else if (args[0] === 'JZ') {
        pc = convertToNum(jz(args[1], pc.toString(16), flag));
    } else if (args[0] === 'JNZ') {
        pc = convertToNum(jnz(args[1], pc.toString(16), flag));
    } else if (args[0] === 'HLT') {
        pc = hexAdd16(pc, instructionSize(args[0]), dummy, false);
    } else {
        throw Error(`Invalid instruction ${args[0]} at PC:${pc.toString(16)}`);
    }
    return pc;
};
