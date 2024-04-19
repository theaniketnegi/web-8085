import { convertToNum, hexAdd16, validateAddr, validateAddrString } from './utils';

const increaseAddr = (pc: string) => {
    const numPc = convertToNum(pc);
    if (validateAddrString(pc) && validateAddr(numPc))
        return hexAdd16(
            numPc,
            0x0003,
            new Array(5).fill(false),
            false,
        ).toString(16);
    else throw Error('Invalid address');
};

export const jmp = (addr: string) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) return addr;
    else throw Error('Invalid address');
};

export const jnc = (addr: string, pc: string, flag: boolean[]) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        if (!flag[0]) {
            return addr;
        } else return increaseAddr(pc);
    } else throw Error('Invalid address');
};

export const jc = (addr: string, pc: string, flag: boolean[]) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        if (flag[0]) {
            return addr;
        } else return increaseAddr(pc);
    } else throw Error('Invalid address');
};

export const jnz = (addr: string, pc: string, flag: boolean[]) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        if (!flag[3]) {
            return addr;
        } else return increaseAddr(pc);
    } else throw Error('Invalid address');
};

export const jz = (addr: string, pc: string, flag: boolean[]) => {
    const hexAddr = convertToNum(addr);
    if (validateAddr(hexAddr) && validateAddrString(addr)) {
        if (flag[3]) {
            return addr;
        } else return increaseAddr(pc);
    } else throw Error('Invalid address');
};
