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
    isBranching,
    updatePC,
    validateAddr,
    validateAddrString,
    validateLine,
} from './utils';

export const execute = (code: string, pc: string) => {
    const codeArr = code.trim().split('\n');
    let start = convertToNum(pc);

    const labelMap = new Map<string, string>();
    let currentPc = start;

    if (!validateAddr(parseInt(pc, 16)) || !validateAddrString(pc)) {
        throw Error('Invalid value at PC');
    }

    const cleanCode: { instruction: string; line: string }[] = [];

    for (const line of codeArr) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        let instruction = trimmedLine;
        if (trimmedLine.includes(':')) {
            const parts = trimmedLine.split(':', 2);
            const label = parts[0];
            instruction = parts[1];

            if (/\s/.test(label) || label == '') {
                throw Error(`Invalid label format: "${label}"`);
            }

            if (!Number.isNaN(Number(label))) {
                throw Error(`A number cannot be set as a label: ${label}`);
            }
            if (opcodes[label.toUpperCase()]) {
                throw Error(
                    `Label cannot be an instruction mnemonic: ${label}`,
                );
            }

            if (labelMap.has(label.toUpperCase())) {
                throw Error(`Duplicate label detected: ${label}`);
            }

            labelMap.set(
                label.toUpperCase(),
                currentPc.toString(16).padStart(4, '0'),
            );
        }

        if (instruction) {
            try {
                const { size } = matchInstructions(instruction);
                currentPc = hexAdd16(currentPc, size, [], false);
            } catch (e) {
                if (e instanceof Error) {
                    throw new Error(
                        `Syntax error on line "${line}": ${e.message}`,
                    );
                }
                throw e;
            }
        }

        cleanCode.push({ instruction, line });
    }

    for (const { instruction, line } of cleanCode) {
        if (!instruction) continue;
        if (validateAddr(parseInt(pc, 16)) && validateAddrString(pc)) {
            if (validateLine(instruction, labelMap)) {
                const { opcode, size, data } = matchInstructions(instruction);
                let resolvedData = data;
                if (
                    resolvedData &&
                    Number.isNaN(Number(resolvedData)) &&
                    isBranching(opcode)
                ) {
                    if (labelMap.has(resolvedData.toUpperCase())) {
                        resolvedData = labelMap.get(resolvedData.toUpperCase());
                    } else {
                        throw Error(
                            `Invalid data: "${data}". Expected a numeric value. Error on line: "${line}"`,
                        );
                    }
                }
                pc = updatePC(pc, memory, opcode, resolvedData, size);
            } else {
                throw Error('Invalid instruction');
            }
        } else {
            throw Error('Invalid value at PC');
        }
    }

    const end = convertToNum(pc);

    let iterations = 0;
    const maxIterations = 500000;
    while (start < end && iterations < maxIterations) {
        start = process(memory[start], start, memory, flag, registers);
        iterations++;
    }

    if (iterations >= maxIterations) {
        throw Error('Execution timed out. Possible infinite loop detected');
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
    const formattedLine = line
        .replace(/,(\S)/g, ', $1')
        .replace(/ +/g, ' ')
        .trim();

    if (opcodes[formattedLine]) {
        return {
            opcode: opcodes[formattedLine as opcodeKey].opcode,
            size: opcodes[formattedLine as opcodeKey].size,
        };
    }

    const parts = formattedLine.split(/, | /).filter((ch) => ch);

    if (parts.length >= 2) {
        let key = `${parts[0]} ${parts[1]}`;
        if (opcodes[key]) {
            return {
                opcode: opcodes[key].opcode,
                size: opcodes[key].size,
                data: parts[2],
            };
        }

        key = parts[0];
        if (opcodes[key]) {
            if (parts.length !== 2) throw Error(`Invalid arguments for ${key}`);
            return {
                opcode: opcodes[key].opcode,
                size: opcodes[key].size,
                data: parts[1],
            };
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
    const dummy = new Array(5).fill(false);

    let data = '';
    if (size == 2) {
        data = memory[pc + 1];
    } else if (size == 3) {
        data += memory[pc + 2];
        data += memory[pc + 1];
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
