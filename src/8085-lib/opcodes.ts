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
    ADI: { opcode: 'C6', size: 2 },
    CMA: { opcode: '2F', size: 1 },
    'CMP A': { opcode: 'BF', size: 1 },
    'CMP B': { opcode: 'B8', size: 1 },
    'CMP C': { opcode: 'B9', size: 1 },
    'CMP D': { opcode: 'BA', size: 1 },
    'CMP E': { opcode: 'BB', size: 1 },
    'CMP H': { opcode: 'BC', size: 1 },
    'CMP L': { opcode: 'BD', size: 1 },
    'CMP M': { opcode: 'BE', size: 1 },
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
    'MVI A': { opcode: '3E', size: 2 },
    'MVI B': { opcode: '06', size: 2 },
    'MVI C': { opcode: '0E', size: 2 },
    'MVI D': { opcode: '16', size: 2 },
    'MVI E': { opcode: '1E', size: 2 },
    'MVI H': { opcode: '26', size: 2 },
    'MVI L': { opcode: '2E', size: 2 },
    'MVI M': { opcode: '36', size: 2 },
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

export const instructions = {
    '87': { instruction: 'ADD A', size: 1 },
    '80': { instruction: 'ADD B', size: 1 },
    '81': { instruction: 'ADD C', size: 1 },
    '82': { instruction: 'ADD D', size: 1 },
    '83': { instruction: 'ADD E', size: 1 },
    '84': { instruction: 'ADD H', size: 1 },
    '85': { instruction: 'ADD L', size: 1 },
    '86': { instruction: 'ADD M', size: 1 },
    'C6': { instruction: 'ADI', size: 2 },
    '2F': { instruction: 'CMA', size: 1 },
    'BF': { instruction: 'CMP A', size: 1 },
    'B8': { instruction: 'CMP B', size: 1 },
    'B9': { instruction: 'CMP C', size: 1 },
    'BA': { instruction: 'CMP D', size: 1 },
    'BB': { instruction: 'CMP E', size: 1 },
    'BC': { instruction: 'CMP H', size: 1 },
    'BD': { instruction: 'CMP L', size: 1 },
    'BE': { instruction: 'CMP M', size: 1 },
    '09': { instruction: 'DAD B', size: 1 },
    '19': { instruction: 'DAD D', size: 1 },
    '29': { instruction: 'DAD H', size: 1 },
    '3D': { instruction: 'DCR A', size: 1 },
    '05': { instruction: 'DCR B', size: 1 },
    '0D': { instruction: 'DCR C', size: 1 },
    '15': { instruction: 'DCR D', size: 1 },
    '1D': { instruction: 'DCR E', size: 1 },
    '25': { instruction: 'DCR H', size: 1 },
    '2D': { instruction: 'DCR L', size: 1 },
    '35': { instruction: 'DCR M', size: 1 },
    '0B': { instruction: 'DCX B', size: 1 },
    '1B': { instruction: 'DCX D', size: 1 },
    '2B': { instruction: 'DCX H', size: 1 },
    '76': { instruction: 'HLT', size: 1 },
    '3C': { instruction: 'INR A', size: 1 },
    '04': { instruction: 'INR B', size: 1 },
    '0C': { instruction: 'INR C', size: 1 },
    '14': { instruction: 'INR D', size: 1 },
    '1C': { instruction: 'INR E', size: 1 },
    '24': { instruction: 'INR H', size: 1 },
    '2C': { instruction: 'INR L', size: 1 },
    '34': { instruction: 'INR M', size: 1 },
    '03': { instruction: 'INX B', size: 1 },
    '13': { instruction: 'INX D', size: 1 },
    '23': { instruction: 'INX H', size: 1 },
    'DA': { instruction: 'JC', size: 3 },
    'C3': { instruction: 'JMP', size: 3 },
    'D2': { instruction: 'JNC', size: 3 },
    'C2': { instruction: 'JNZ', size: 3 },
    'CA': { instruction: 'JZ', size: 3 },
    '3A': { instruction: 'LDA', size: 3 },
    '0A': { instruction: 'LDAX B', size: 1 },
    '1A': { instruction: 'LDAX D', size: 1 },
    '2A': { instruction: 'LHLD', size: 3 },
    '01': { instruction: 'LXI B', size: 3 },
    '11': { instruction: 'LXI D', size: 3 },
    '21': { instruction: 'LXI H', size: 3 },
    '31': { instruction: 'LXI SP', size: 3 },
    '7F': { instruction: 'MOV A, A', size: 1 },
    '78': { instruction: 'MOV A, B', size: 1 },
    '79': { instruction: 'MOV A, C', size: 1 },
    '7A': { instruction: 'MOV A, D', size: 1 },
    '7B': { instruction: 'MOV A, E', size: 1 },
    '7C': { instruction: 'MOV A, H', size: 1 },
    '7D': { instruction: 'MOV A, L', size: 1 },
    '7E': { instruction: 'MOV A, M', size: 1 },
    '47': { instruction: 'MOV B, A', size: 1 },
    '40': { instruction: 'MOV B, B', size: 1 },
    '41': { instruction: 'MOV B, C', size: 1 },
    '42': { instruction: 'MOV B, D', size: 1 },
    '43': { instruction: 'MOV B, E', size: 1 },
    '44': { instruction: 'MOV B, H', size: 1 },
    '45': { instruction: 'MOV B, L', size: 1 },
    '46': { instruction: 'MOV B, M', size: 1 },
    '4F': { instruction: 'MOV C, A', size: 1 },
    '48': { instruction: 'MOV C, B', size: 1 },
    '49': { instruction: 'MOV C, C', size: 1 },
    '4A': { instruction: 'MOV C, D', size: 1 },
    '4B': { instruction: 'MOV C, E', size: 1 },
    '4C': { instruction: 'MOV C, H', size: 1 },
    '4D': { instruction: 'MOV C, L', size: 1 },
    '4E': { instruction: 'MOV C, M', size: 1 },
    '57': { instruction: 'MOV D, A', size: 1 },
    '50': { instruction: 'MOV D, B', size: 1 },
    '51': { instruction: 'MOV D, C', size: 1 },
    '52': { instruction: 'MOV D, D', size: 1 },
    '53': { instruction: 'MOV D, E', size: 1 },
    '54': { instruction: 'MOV D, H', size: 1 },
    '55': { instruction: 'MOV D, L', size: 1 },
    '56': { instruction: 'MOV D, M', size: 1 },
    '5F': { instruction: 'MOV E, A', size: 1 },
    '58': { instruction: 'MOV E, B', size: 1 },
    '59': { instruction: 'MOV E, C', size: 1 },
    '5A': { instruction: 'MOV E, D', size: 1 },
    '5B': { instruction: 'MOV E, E', size: 1 },
    '5C': { instruction: 'MOV E, H', size: 1 },
    '5D': { instruction: 'MOV E, L', size: 1 },
    '5E': { instruction: 'MOV E, M', size: 1 },
    '67': { instruction: 'MOV H, A', size: 1 },
    '60': { instruction: 'MOV H, B', size: 1 },
    '61': { instruction: 'MOV H, C', size: 1 },
    '62': { instruction: 'MOV H, D', size: 1 },
    '63': { instruction: 'MOV H, E', size: 1 },
    '64': { instruction: 'MOV H, H', size: 1 },
    '65': { instruction: 'MOV H, L', size: 1 },
    '66': { instruction: 'MOV H, M', size: 1 },
    '6F': { instruction: 'MOV L, A', size: 1 },
    '68': { instruction: 'MOV L, B', size: 1 },
    '69': { instruction: 'MOV L, C', size: 1 },
    '6A': { instruction: 'MOV L, D', size: 1 },
    '6B': { instruction: 'MOV L, E', size: 1 },
    '6C': { instruction: 'MOV L, H', size: 1 },
    '6D': { instruction: 'MOV L, L', size: 1 },
    '6E': { instruction: 'MOV L, M', size: 1 },
    '77': { instruction: 'MOV M, A', size: 1 },
    '70': { instruction: 'MOV M, B', size: 1 },
    '71': { instruction: 'MOV M, C', size: 1 },
    '72': { instruction: 'MOV M, D', size: 1 },
    '73': { instruction: 'MOV M, E', size: 1 },
    '74': { instruction: 'MOV M, H', size: 1 },
    '75': { instruction: 'MOV M, L', size: 1 },
    '3E': { instruction: 'MVI A', size: 2 },
    '06': { instruction: 'MVI B', size: 2 },
    '0E': { instruction: 'MVI C', size: 2 },
    '16': { instruction: 'MVI D', size: 2 },
    '1E': { instruction: 'MVI E', size: 2 },
    '26': { instruction: 'MVI H', size: 2 },
    '2E': { instruction: 'MVI L', size: 2 },
    '36': { instruction: 'MVI M', size: 2 },
    '22': { instruction: 'SHLD', size: 3 },
    '32': { instruction: 'STA', size: 3 },
    '02': { instruction: 'STAX B', size: 1 },
    '12': { instruction: 'STAX D', size: 1 },
    '97': { instruction: 'SUB A', size: 1 },
    '90': { instruction: 'SUB B', size: 1 },
    '91': { instruction: 'SUB C', size: 1 },
    '92': { instruction: 'SUB D', size: 1 },
    '93': { instruction: 'SUB E', size: 1 },
    '94': { instruction: 'SUB H', size: 1 },
    '95': { instruction: 'SUB L', size: 1 },
    '96': { instruction: 'SUB M', size: 1 },
    'D6': { instruction: 'SUI', size: 2 },
    'EB': { instruction: 'XCHG', size: 1 },
};

export type opcodeKey = keyof typeof opcodes;
export type instructionKey = keyof typeof instructions;