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
        reg === 'L'
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
    flag[0] = carry;
    flag[1] = !(count & 1);
    flag[2] = auxCarry;
    flag[3] = result === 0;
    flag[4] = result >= 0x80 && result <= 0xff;
    return result;
};

export const hexSub = (valA: number, valB: number, flag: boolean[]) => {
    const result = hexAdd(valA, twosComplement(valB, flag), flag);
    flag[0] = false;
    flag[2] = false;

    flag[0] = valA - valB < 0;

    const lNibbleA = valA & 0x0f;
    const lNibbleB = valB & 0x0f;

    flag[2] = lNibbleA - lNibbleB < 0;

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
        if (isDAD) flag[0] = true;
        result = result & 0xffff;
    }

    return result;
};

export const compare = (valA: number, valB: number, flag: boolean[]) => {
    if (valA == valB) {
        flag[3] = true;
    } else if (valA < valB) {
        flag[0] = true;
    } else {
        flag[0] = false;
        flag[3] = false;
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
