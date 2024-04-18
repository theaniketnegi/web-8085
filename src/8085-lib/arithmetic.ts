import {
    hexAdd,
    hexAdd16,
    hexSub,
    twosComplement16,
    validateAddr,
    validateMemRegister,
    validateRegister,
    validateRegPair,
} from './utils';

export const add = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: Uint8Array,
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H') as number;
                const L = registers.get('L') as number;
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    registers.set(
                        'A',
                        hexAdd(
                            registers.get('A') as number,
                            memory[addr] as number,
                            flag,
                        ),
                    );
                } else {
                    throw Error('Invalid address');
                }
            } else {
                registers.set(
                    'A',
                    hexAdd(
                        registers.get('A') as number,
                        registers.get(register) as number,
                        flag,
                    ),
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
    data: number,
    registers: Map<string, number>,
    flag: boolean[],
) => {
    if (data >= 0x00 && data <= 0xff)
        registers.set('A', hexAdd(data, registers.get('A') as number, flag));
    else throw Error('Invalid data');
};

export const sub = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: Uint8Array,
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H') as number;
                const L = registers.get('L') as number;
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    registers.set(
                        'A',
                        hexSub(
                            registers.get('A') as number,
                            memory[addr] as number,
                            flag,
                        ),
                    );
                } else {
                    throw Error('Invalid address');
                }
            } else {
                registers.set(
                    'A',
                    hexSub(
                        registers.get('A') as number,
                        registers.get(register) as number,
                        flag,
                    ),
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
    data: number,
    registers: Map<string, number>,
    flag: boolean[],
) => {
    if (data >= 0x00 && data <= 0xff)
        registers.set('A', hexSub(registers.get('A') as number, data, flag));
    else throw Error('Invalid data');
};

export const inr = (
    register: string,
    registers: Map<string, number>,
    flag: boolean[],
    memory: Uint8Array,
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H') as number;
                const L = registers.get('L') as number;
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const initCY = flag[0];
                    memory[addr] = hexAdd(memory[addr] as number, 0x01, flag);
                    flag[0] = initCY;
                } else {
                    throw Error('Invalid address');
                }
            } else {
                const initCY = flag[0];
                registers.set(
                    register,
                    hexAdd(registers.get(register) as number, 0x01, flag),
                );
                flag[0] = initCY;
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
    memory: Uint8Array,
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            if (register === 'M') {
                const H = registers.get('H') as number;
                const L = registers.get('L') as number;
                const addr = (H << 8) | L;
                if (validateAddr(addr)) {
                    const initCY = flag[0];
                    memory[addr] = hexSub(memory[addr] as number, 0x01, flag);
                    flag[0] = initCY;
                } else {
                    throw Error('Invalid address');
                }
            } else {
                const initCY = flag[0];
                registers.set(
                    register,
                    hexSub(registers.get(register) as number, 0x01, flag),
                );
                flag[0] = initCY;
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
            const dummyFlag: boolean[] = new Array(8).fill(false);
            const num =
                ((registers.get(register) as number) << 8) |
                (registers.get(
                    String.fromCharCode(register.charCodeAt(0) + 1),
                ) as number);

            const result = hexAdd16(num, 0x0001, dummyFlag, false);
            registers.set(register, (result & 0xff00) >> 8);
            registers.set(
                String.fromCharCode(register.charCodeAt(0) + 1),
                result & 0x00ff,
            );
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
            const dummyFlag: boolean[] = new Array(8).fill(false);
            const pair =
                register !== 'H'
                    ? String.fromCharCode(register.charCodeAt(0) + 1)
                    : 'L';
            const num =
                ((registers.get(register) as number) << 8) |
                (registers.get(pair) as number);

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
            const num =
                ((registers.get(register) as number) << 8) |
                (registers.get(pair) as number);

            const numToAdd =
                ((registers.get('H') as number) << 8) |
                (registers.get('L') as number);

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
