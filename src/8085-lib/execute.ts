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
import { instructionKey, instructions, opcodeKey, opcodes } from './opcodes';
import {
    convertToNum,
    hexAdd16,
    updatePC,
    validateAddr,
    validateAddrString,
    validateLine,
} from './utils';

export const execute = (code: string, pc: string) => {
    const codeArr = code.trim().split('\n');
    let start = convertToNum(pc);
    codeArr.forEach((line) => {
        if (validateAddr(parseInt(pc, 16)) && validateAddrString(pc)) {
            if (validateLine(line)) {
                const { opcode, size, data } = matchInstructions(line);
                pc = updatePC(pc, memory, opcode, data, size);
            } else {
                throw Error('Invalid instruction');
            }
        } else {
            throw Error('Invalid value at PC');
        }
    });

    console.log(memory);
    const end = convertToNum(pc);

    while (start < end) {
        start = process(memory[start], start, memory, flag, registers);
    }

    return {
        registers,
        memory,
        flag,
    };
};

const matchInstructions = (
    line: string,
): { opcode: string; size: number; data?: string } => {
    const args: string[] = line.split(/[, ]/);
    if (opcodes[args[0] as opcodeKey]) {
        return {
            opcode: opcodes[args[0] as opcodeKey].opcode,
            size: opcodes[args[0] as opcodeKey].size,
            data: args[1],
        };
    } else if (opcodes[line as opcodeKey]) {
        return {
            opcode: opcodes[line as opcodeKey].opcode,
            size: opcodes[line as opcodeKey].size,
        };
    } else {
        let str = line;
        str = str.trim();
        str = str.replace(',', ' , ');
        str = str.replace(/ +/g, ' ');
        const index = str.lastIndexOf(' ');

        const mnemonic = str.substring(0, index - 2);
        const data = str.substring(index + 1);

        console.log([mnemonic, data]);
        if (mnemonic) {
            const instruction = mnemonic;
            if (opcodes[instruction as opcodeKey]) {
                return {
                    opcode: opcodes[instruction as opcodeKey].opcode,
                    size: opcodes[instruction as opcodeKey].size,
                    data,
                };
            }
        }
    }
    return { opcode: '00', size: 0 };
};

const process = (
    opcode: string,
    pc: number,
    memory: string[],
    flag: boolean[],
    registers: Map<string, number>,
) => {
    const { instruction, size } = instructions[opcode as instructionKey];
    const args = instruction.split(/[, ]/).filter((item) => item !== '');
    console.log(args);
    const dummy = new Array(5).fill(false);

	let data = ''; 
	if(size==2){
		data = memory[pc+1];
	} else if (size==3) {
		data += memory[pc+2];
		data += memory[pc+1];
	}

    if (args[0] === 'MOV') {
        mov(args[1], args[2], registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'MVI') {
        mvi(args[1], data, registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'LXI') {
        lxi(args[1], data, registers);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'LDA') {
        lda(data, registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'STA') {
        sta(data, registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'LHLD') {
        lhld(data, registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'SHLD') {
        shld(data, registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'STAX') {
        stax(args[1], registers, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'XCHG') {
        xchg(registers);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'ADD') {
        add(args[1], registers, flag, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'ADI') {
        adi(data, registers, flag);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'SUB') {
        sub(args[1], registers, flag, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'SUI') {
        sui(data, registers, flag);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'INR') {
        inr(args[1], registers, flag, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'INX') {
        inx(args[1], registers);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'DCX') {
        dcx(args[1], registers);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'DCR') {
        dcr(args[1], registers, flag, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'DAD') {
        dad(args[1], registers, flag);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'CMA') {
        cma(registers);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'CMP') {
        cmp(args[1], registers, flag, memory);
        pc = hexAdd16(pc, size, dummy, false);
    } else if (args[0] === 'JMP') {
        pc = convertToNum(jmp(data));
    } else if (args[0] === 'JC') {
        pc = convertToNum(jc(data, pc.toString(16), flag));
    } else if (args[0] === 'JNC') {
        pc = convertToNum(jnc(data, pc.toString(16), flag));
    } else if (args[0] === 'JZ') {
        pc = convertToNum(jz(data, pc.toString(16), flag));
    } else if (args[0] === 'JNZ') {
        pc = convertToNum(jnz(data, pc.toString(16), flag));
    } else if (args[0] === 'HLT') {
        pc = hexAdd16(pc, size, dummy, false);
    } else {
        throw Error(`Invalid instruction ${args[0]} at PC:${pc.toString(16)}`);
    }
    return pc;
};
