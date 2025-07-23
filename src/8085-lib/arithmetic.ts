import { Flag } from './init';
import {
    convertToNum,
    hexAdd,
    hexAdd16,
    hexSub,
    twosComplement16,
    validateAddr,
    validateDataString,
    validateImmediateData,
    validateMemRegister,
    validateRegister,
    validateRegPair,
} from './utils';

export const add = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: string[],
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H')!;
                const L = registers.get('L')!;
                if (!validateImmediateData(H) || !validateImmediateData(L))
                    throw Error('Invalid address');
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const valueAtAddr = convertToNum(memory[addr]);
                    if (
                        validateDataString(memory[addr]) &&
                        validateImmediateData(valueAtAddr)
                    ) {
                        registers.set(
                            'A',
                            hexAdd(registers.get('A')!, valueAtAddr, flag),
                        );
                    } else {
                        throw Error('Invalid data');
                    }
                } else {
                    throw Error('Invalid address');
                }
            } else {
                registers.set(
                    'A',
                    hexAdd(registers.get('A')!, registers.get(register)!, flag),
                );
            }
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const adi = (
    data: string,
    registers: Map<string, number>,
    flag: boolean[],
) => {
    const hexData = convertToNum(data);
    if (validateImmediateData(hexData) && validateDataString(data))
        registers.set('A', hexAdd(hexData, registers.get('A')!, flag));
    else throw Error('Invalid data');
};

export const sub = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: string[],
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H')!;
                const L = registers.get('L')!;
                if (!validateImmediateData(H) || !validateImmediateData(L))
                    throw Error('Invalid address');
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const valueAtAddr = convertToNum(memory[addr]);
                    if (
                        validateDataString(memory[addr]) &&
                        validateImmediateData(valueAtAddr)
                    ) {
                        registers.set(
                            'A',
                            hexSub(registers.get('A')!, valueAtAddr, flag),
                        );
                    } else {
                        throw Error('Invalid data');
                    }
                } else {
                    throw Error('Invalid address');
                }
            } else {
                registers.set(
                    'A',
                    hexSub(registers.get('A')!, registers.get(register)!, flag),
                );
            }
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const sui = (
    data: string,
    registers: Map<string, number>,
    flag: boolean[],
) => {
    const hexData = convertToNum(data);
    if (validateImmediateData(hexData) && validateDataString(data))
        registers.set('A', hexSub(registers.get('A')!, hexData, flag));
    else throw Error('Invalid data');
};

export const inr = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: string[],
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H')!;
                const L = registers.get('L')!;
                if (!validateImmediateData(H) || !validateImmediateData(L))
                    throw Error('Invalid address');
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const valueAtAddr = convertToNum(memory[addr]);
                    if (
                        validateDataString(memory[addr]) &&
                        validateImmediateData(valueAtAddr)
                    ) {
                        const initCY = flag[Flag.Carry];
                        memory[addr] = hexAdd(valueAtAddr, 0x01, flag).toString(
                            16,
                        );
                        flag[Flag.Carry] = initCY;
                    } else {
                        throw Error('Invalid data');
                    }
                } else {
                    throw Error('Invalid address');
                }
            } else {
                const initCY = flag[Flag.Carry];
                registers.set(
                    register,
                    hexAdd(registers.get(register)!, 0x01, flag),
                );
                flag[Flag.Carry] = initCY;
            }
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const dcr = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: string[],
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H')!;
                const L = registers.get('L')!;
                if (!validateImmediateData(H) || !validateImmediateData(L))
                    throw Error('Invalid address');
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const valueAtAddr = convertToNum(memory[addr]);
                    if (
                        validateDataString(memory[addr]) &&
                        validateImmediateData(valueAtAddr)
                    ) {
                        const initCY = flag[Flag.Carry];
                        memory[addr] = hexSub(valueAtAddr, 0x01, flag).toString(
                            16,
                        );
                        flag[Flag.Carry] = initCY;
                    } else {
                        throw Error('Invalid data');
                    }
                } else {
                    throw Error('Invalid address');
                }
            } else {
                const initCY = flag[Flag.Carry];
                registers.set(
                    register,
                    hexSub(registers.get(register)!, 0x01, flag),
                );
                flag[Flag.Carry] = initCY;
            }
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const inx = (register: string, registers: Map<string, number>) => {
    if (register.length === 1) {
        if (validateRegPair(register)) {
            const dummyFlag: boolean[] = new Array(5).fill(false);
            const pair =
                register !== 'H'
                    ? String.fromCharCode(register.charCodeAt(0) + 1)
                    : 'L';
            const num = (registers.get(register)! << 8) | registers.get(pair)!;

            const result = hexAdd16(num, 0x0001, dummyFlag, false);
            registers.set(register, (result & 0xff00) >> 8);
            registers.set(pair, result & 0x00ff);
        } else {
            throw Error('Invalid register pair');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const dcx = (register: string, registers: Map<string, number>) => {
    if (register.length === 1) {
        if (validateRegPair(register)) {
            const dummyFlag: boolean[] = new Array(5).fill(false);
            const pair =
                register !== 'H'
                    ? String.fromCharCode(register.charCodeAt(0) + 1)
                    : 'L';
            const num = (registers.get(register)! << 8) | registers.get(pair)!;

            const result = hexAdd16(
                num,
                twosComplement16(0x0001, dummyFlag),
                dummyFlag,
                false,
            );

            registers.set(register, (result & 0xff00) >> 8);
            registers.set(pair, result & 0x00ff);
        } else {
            throw Error('Invalid register pair');
        }
    } else {
        throw Error('Invalid register');
    }
};

export const dad = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
) => {
    if (register.length === 1) {
        if (validateRegPair(register)) {
            const pair =
                register !== 'H'
                    ? String.fromCharCode(register.charCodeAt(0) + 1)
                    : 'L';
            const num = (registers.get(register)! << 8) | registers.get(pair)!;

            const numToAdd = (registers.get('H')! << 8) | registers.get('L')!;

            const result = hexAdd16(num, numToAdd, flag, true);

            registers.set('H', (result & 0xff00) >> 8);
            registers.set('L', result & 0x00ff);
        } else {
            throw Error('Invalid register pair');
        }
    } else {
        throw Error('Invalid register');
    }
};
