import {
    compare,
    complement,
    validateMemRegister,
    validateRegister,
} from './utils';

export const cma = (registers: Map<string, number>) => {
    registers.set('A', complement(registers.get('A')!));
};

export const cmp = (
    register: string,
    registers: Map<string, number>,
    flags: boolean[],
    memory: Uint8Array,
) => {
    if (register.length === 1) {
        if (validateRegister(register) || validateMemRegister(register)) {
            let value = 0;
            if (register === 'M') {
                const addr = (registers.get('H')! << 8) | registers.get('L')!;
                value = memory[addr];
            } else {
                value = registers.get(register)!;
            }

            if (value) {
                compare(registers.get('A')!, value, flags);
            }
        } else {
            throw Error('Invalid register');
        }
    } else {
        throw Error('Invalid register');
    }
};
