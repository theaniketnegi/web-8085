import {
    hexAdd,
    hexSub,
    validateAddr,
    validateMemRegister,
    validateRegister,
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
