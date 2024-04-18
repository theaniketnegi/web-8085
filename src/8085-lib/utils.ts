export const validateRegister = (reg: string) => {
    return (
        reg === 'A' ||
        reg === 'B' ||
        reg === 'C' ||
        reg === 'D' ||
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

export const complement = (data: number) => {
    return 0xff - data;
};

export const twosComplement = (data: number, flag: boolean[]) => {
    const comp = complement(data);
    const result = hexAdd(comp, 0x01, flag);
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
    if (valA === 0x80 || valB === 0x80) console.log(result);
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
