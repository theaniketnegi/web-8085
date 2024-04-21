export type opcodeType = {
    [key: string]: { opcode: string; size: number };
};
export const opcodes: opcodeType = {
    'ADD A': { opcode: '87', size: 1 },
    'ADD B': { opcode: '80', size: 1 },
    'ADD C': { opcode: '81', size: 1 },
    'ADD D': { opcode: '82', size: 1 },
    'ADD E': { opcode: '83', size: 1 },
    'ADD H': { opcode: '84', size: 1 },
    'ADD L': { opcode: '85', size: 1 },
    'ADD M': { opcode: '86', size: 1 },
    ADI: { opcode: '06', size: 2 },
    CMA: { opcode: '2F', size: 1 },
    'CMP A': { opcode: 'BF', size: 1 },
    'CMP B': { opcode: 'B8', size: 1 },
    'CMP C': { opcode: 'B9', size: 1 },
    'CMP D': { opcode: 'BA', size: 1 },
    'CMP E': { opcode: 'BB', size: 1 },
    'CMP H': { opcode: 'BC', size: 1 },
    'CMP L': { opcode: 'BD', size: 1 },
    'CMP M': { opcode: 'BD', size: 1 },
    'DAD B': { opcode: '09', size: 1 },
    'DAD D': { opcode: '19', size: 1 },
    'DAD H': { opcode: '29', size: 1 },
    'DCR A': { opcode: '3D', size: 1 },
    'DCR B': { opcode: '05', size: 1 },
    'DCR C': { opcode: '0D', size: 1 },
    'DCR D': { opcode: '15', size: 1 },
    'DCR E': { opcode: '1D', size: 1 },
    'DCR H': { opcode: '25', size: 1 },
    'DCR L': { opcode: '2D', size: 1 },
    'DCR M': { opcode: '35', size: 1 },
    'DCX B': { opcode: '0B', size: 1 },
    'DCX D': { opcode: '1B', size: 1 },
    'DCX H': { opcode: '2B', size: 1 },
    HLT: { opcode: '76', size: 1 },
    'INR A': { opcode: '3C', size: 1 },
    'INR B': { opcode: '04', size: 1 },
    'INR C': { opcode: '0C', size: 1 },
    'INR D': { opcode: '14', size: 1 },
    'INR E': { opcode: '1C', size: 1 },
    'INR H': { opcode: '24', size: 1 },
    'INR L': { opcode: '2C', size: 1 },
    'INR M': { opcode: '34', size: 1 },
    'INX B': { opcode: '03', size: 1 },
    'INX D': { opcode: '13', size: 1 },
    'INX H': { opcode: '23', size: 1 },
    JC: { opcode: 'DA', size: 3 },
    JMP: { opcode: 'C3', size: 3 },
    JNC: { opcode: 'D2', size: 3 },
    JNZ: { opcode: 'C2', size: 3 },
    JZ: { opcode: 'CA', size: 3 },
    LDA: { opcode: '3A', size: 3 },
    'LDAX B': { opcode: '0A', size: 1 },
    'LDAX D': { opcode: '1A', size: 1 },
    LHLD: { opcode: '2A', size: 3 },
    'LXI B': { opcode: '01', size: 3 },
    'LXI D': { opcode: '11', size: 3 },
    'LXI H': { opcode: '21', size: 3 },
    'LXI SP': { opcode: '31', size: 3 },
    'MOV A, A': { opcode: '7F', size: 1 },
    'MOV A, B': { opcode: '78', size: 1 },
    'MOV A, C': { opcode: '79', size: 1 },
    'MOV A, D': { opcode: '7A', size: 1 },
    'MOV A, E': { opcode: '7B', size: 1 },
    'MOV A, H': { opcode: '7C', size: 1 },
    'MOV A, L': { opcode: '7D', size: 1 },
    'MOV A, M': { opcode: '7E', size: 1 },
    'MOV B, A': { opcode: '47', size: 1 },
    'MOV B, B': { opcode: '40', size: 1 },
    'MOV B, C': { opcode: '41', size: 1 },
    'MOV B, D': { opcode: '42', size: 1 },
    'MOV B, E': { opcode: '43', size: 1 },
    'MOV B, H': { opcode: '44', size: 1 },
    'MOV B, L': { opcode: '45', size: 1 },
    'MOV B, M': { opcode: '46', size: 1 },
    'MOV C, A': { opcode: '4F', size: 1 },
    'MOV C, B': { opcode: '48', size: 1 },
    'MOV C, C': { opcode: '49', size: 1 },
    'MOV C, D': { opcode: '4A', size: 1 },
    'MOV C, E': { opcode: '4B', size: 1 },
    'MOV C, H': { opcode: '4C', size: 1 },
    'MOV C, L': { opcode: '4D', size: 1 },
    'MOV C, M': { opcode: '4E', size: 1 },
    'MOV D, A': { opcode: '57', size: 1 },
    'MOV D, B': { opcode: '50', size: 1 },
    'MOV D, C': { opcode: '51', size: 1 },
    'MOV D, D': { opcode: '52', size: 1 },
    'MOV D, E': { opcode: '53', size: 1 },
    'MOV D, H': { opcode: '54', size: 1 },
    'MOV D, L': { opcode: '55', size: 1 },
    'MOV D, M': { opcode: '56', size: 1 },
    'MOV E, A': { opcode: '5F', size: 1 },
    'MOV E, B': { opcode: '58', size: 1 },
    'MOV E, C': { opcode: '59', size: 1 },
    'MOV E, D': { opcode: '5A', size: 1 },
    'MOV E, E': { opcode: '5B', size: 1 },
    'MOV E, H': { opcode: '5C', size: 1 },
    'MOV E, L': { opcode: '5D', size: 1 },
    'MOV E, M': { opcode: '5E', size: 1 },
    'MOV H, A': { opcode: '67', size: 1 },
    'MOV H, B': { opcode: '60', size: 1 },
    'MOV H, C': { opcode: '61', size: 1 },
    'MOV H, D': { opcode: '62', size: 1 },
    'MOV H, E': { opcode: '63', size: 1 },
    'MOV H, H': { opcode: '64', size: 1 },
    'MOV H, L': { opcode: '65', size: 1 },
    'MOV H, M': { opcode: '66', size: 1 },
    'MOV L, A': { opcode: '6F', size: 1 },
    'MOV L, B': { opcode: '68', size: 1 },
    'MOV L, C': { opcode: '69', size: 1 },
    'MOV L, D': { opcode: '6A', size: 1 },
    'MOV L, E': { opcode: '6B', size: 1 },
    'MOV L, H': { opcode: '6C', size: 1 },
    'MOV L, L': { opcode: '6D', size: 1 },
    'MOV L, M': { opcode: '6E', size: 1 },
    'MOV M, A': { opcode: '77', size: 1 },
    'MOV M, B': { opcode: '70', size: 1 },
    'MOV M, C': { opcode: '71', size: 1 },
    'MOV M, D': { opcode: '72', size: 1 },
    'MOV M, E': { opcode: '73', size: 1 },
    'MOV M, H': { opcode: '74', size: 1 },
    'MOV M, L': { opcode: '75', size: 1 },
    'MVI A,': { opcode: '3E', size: 2 },
    'MVI B,': { opcode: '06', size: 2 },
    'MVI C,': { opcode: '0E', size: 2 },
    'MVI D,': { opcode: '16', size: 2 },
    'MVI E,': { opcode: '1E', size: 2 },
    'MVI H,': { opcode: '26', size: 2 },
    'MVI L,': { opcode: '2E', size: 2 },
    'MVI M,': { opcode: '36', size: 2 },
    SHLD: { opcode: '22', size: 3 },
    STA: { opcode: '32', size: 3 },
    'STAX B': { opcode: '02', size: 1 },
    'STAX D': { opcode: '12', size: 1 },
    'SUB A': { opcode: '97', size: 1 },
    'SUB B': { opcode: '90', size: 1 },
    'SUB C': { opcode: '91', size: 1 },
    'SUB D': { opcode: '92', size: 1 },
    'SUB E': { opcode: '93', size: 1 },
    'SUB H': { opcode: '94', size: 1 },
    'SUB L': { opcode: '95', size: 1 },
    'SUB M': { opcode: '96', size: 1 },
    SUI: { opcode: 'D6', size: 2 },
    XCHG: { opcode: 'EB', size: 1 },
};

export type opcodeKey = keyof typeof opcodes;