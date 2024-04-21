import {
    convertToNum,
    hexAdd16,
    swap,
    validateAddr,
    validateAddrString,
    validateDataString,
    validateImmediateData,
    validateRegister,
    validateRegPair,
} from './utils';

export const mov = (
    regA: string,
    regB: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    if (regA.length === 1 && regB.length === 1) {
        if (regA !== 'M' && regB !== 'M') {
            if (validateRegister(regA) && validateRegister(regB)) {
                registers.set(regA, registers.get(regB)!);
            } else {
                throw Error('Invalid register(s)');
            }
        } else if (regA !== 'M' && regB === 'M') {
            if (validateRegister(regA)) {
                if (
                    !validateImmediateData(registers.get('H')!) ||
                    !validateImmediateData(registers.get('L')!)
                )
                    throw Error('Invalid address');
                const addr = (registers.get('H')! << 8) | registers.get('L')!;
                if (validateAddr(addr)) {
                    const valueAtAddr = convertToNum(memory[addr]);
                    if (
                        validateImmediateData(valueAtAddr) &&
                        validateDataString(memory[addr])
                    )
                        registers.set(regA, valueAtAddr);
                    else throw Error('Invalid data');
                } else {
                    throw Error('Invalid address');
                }
            } else {
                throw Error('Invalid register');
            }
        } else if (regA === 'M' && regB !== 'M') {
            if (validateRegister(regB)) {
                if (
                    !validateImmediateData(registers.get('H')!) ||
                    !validateImmediateData(registers.get('L')!)
                )
                    throw Error('Invalid address');
                const addr = (registers.get('H')! << 8) | registers.get('L')!;

                if (validateAddr(addr)) {
                    memory[addr] = registers.get(regB)!.toString(16);
                } else {
                    throw Error('Invalid address');
                }
            } else {
                throw Error('Invalid register');
            }
        } else {
            throw Error('Invalid register(s)');
        }
    } else {
        throw Error('Invalid register(s)');
    }
};

export const mvi = (
    reg: string,
    data: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    const hexData = convertToNum(data);
    if (validateImmediateData(hexData) && validateDataString(data)) {
        if (reg === 'M') {
            if (
                !validateImmediateData(registers.get('H')!) ||
                !validateImmediateData(registers.get('L')!)
            )
                throw Error('Invalid address');
            const addr = (registers.get('H')! << 8) | registers.get('L')!;

            if (validateAddr(addr)) memory[addr] = hexData.toString(16);
            else throw Error('Invalid address');
        } else if (validateRegister(reg)) {
            registers.set(reg, hexData);
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid data');
    }
};

export const lxi = (
    reg: string,
    data: string,
    registers: Map<string, number>,
) => {
    const hexData = convertToNum(data);
    if (validateRegPair(reg)) {
        if (validateAddr(hexData) && validateAddrString(data)) {
            const pair =
                reg === 'H' ? 'L' : String.fromCharCode(reg.charCodeAt(0) + 1);

            registers.set(reg, (hexData & 0xff00) >> 8);
            registers.set(pair, hexData & 0x00ff);
        } else {
            throw Error('Invalid data');
        }
    } else {
        throw Error('Invalid register pair');
    }
};

export const lda = (
    addr: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        const valueAtAddr = convertToNum(memory[hexAddr]);
        if (
            validateImmediateData(valueAtAddr) &&
            validateDataString(memory[hexAddr])
        ) {
            registers.set('A', valueAtAddr);
        } else {
            throw Error('Invalid data');
        }
    } else {
        throw Error('Invalid address');
    }
};

export const sta = (
    addr: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        memory[hexAddr] = registers.get('A')!.toString(16);
    } else {
        throw Error('Invalid address');
    }
};

export const lhld = (
    addr: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    const hexAddr = convertToNum(addr);
    let nextAddr = 0;
    if (validateAddr(hexAddr) && validateAddrString(addr))
        nextAddr = hexAdd16(hexAddr, 0x0001, new Array(5).fill(false), false);
    else throw Error('Invalid address');

    if (validateAddr(nextAddr)) {
        const valueAtAddr = convertToNum(memory[hexAddr]);
        const valueAtNextAddr = convertToNum(memory[nextAddr]);

        if (
            validateDataString(memory[hexAddr]) &&
            validateDataString(memory[nextAddr]) &&
            validateImmediateData(valueAtAddr) &&
            validateImmediateData(valueAtNextAddr)
        ) {
            registers.set('H', valueAtNextAddr);
            registers.set('L', valueAtAddr);
        } else throw Error('Invalid data');
    } else throw Error('Invalid address');
};

export const shld = (
    addr: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    const hexAddr = convertToNum(addr);
    let nextAddr = 0;
    if (validateAddr(hexAddr) && validateAddrString(addr))
        nextAddr = hexAdd16(hexAddr, 0x0001, new Array(5).fill(false), false);
    else throw Error('Invalid address');

    if (validateAddr(nextAddr)) {
        memory[nextAddr] = registers.get('H')!.toString(16);
        memory[hexAddr] = registers.get('L')!.toString(16);
    } else throw Error('Invalid address');
};

export const stax = (
    reg: string,
    registers: Map<string, number>,
    memory: string[],
) => {
    if (validateRegPair(reg) && reg !== 'H') {
        const pair = String.fromCharCode(reg.charCodeAt(0) + 1);
        if (
            !validateImmediateData(registers.get(reg)!) ||
            !validateImmediateData(registers.get(pair)!)
        )
            throw Error('Invalid address');
        const addr = (registers.get(reg)! << 8) | registers.get(pair)!;
        if (validateAddr(addr)) {
            memory[addr] = registers.get('A')!.toString(16);
        } else {
            throw Error('Invalid address');
        }
    } else {
        throw Error('Invalid register pair');
    }
};

export const xchg = (registers: Map<string, number>) => {
    swap('H', 'D', registers);
    swap('L', 'E', registers);
};
