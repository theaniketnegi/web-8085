import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CodeMirror from '@uiw/react-codemirror';
import { toast } from 'sonner';
import { execute } from '@/8085-lib/execute';
import {
    convertToNum,
    validateAddr,
    validateAddrString,
    validateDataString,
    validateImmediateData,
} from '@/8085-lib/utils';
import { defaultProgram, init, set } from '@/8085-lib/init';
import Results from './Results';

const Editor = () => {
    const [code, setCode] = useState(defaultProgram);
    const [value, setValue] = useState('2000');
    const [addr, setAddr] = useState('');
    const [addrVal, setAddrVal] = useState('');

    const [regs, setRegs] = useState<Map<string, number> | null>(null);
    const [flags, setFlags] = useState<boolean[] | null>(null);

    const onExecute = () => {
        const pc = value;
        try {
            if (code.trim() === '') {
                toast.error('Code is required');
                return;
            }
            if (!validateAddr(parseInt(pc, 16)) || !validateAddrString(pc)) {
                toast.error('Invalid address');
                return;
            }
            const { registers, flag } = execute(code.toUpperCase(), pc);
            setRegs(registers);
            setFlags(flag);
            toast.success('Executed successfully');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    };

    const onSetMemory = () => {
        if (
            validateAddr(convertToNum(addr)) &&
            validateAddrString(addr) &&
            validateDataString(addrVal) &&
            validateImmediateData(convertToNum(addrVal))
        ) {
            set(convertToNum(addr), addrVal);
            toast.success(`Set 0x${addrVal} at ${addr}`);
            setAddr('');
            setAddrVal('');
        } else {
            toast.error('Invalid address/data');
        }
    };
    return (
        <div className='flex-1 mt-8 w-[50%] mx-auto flex space-x-72 p-5 overflow-scroll-y'>
            <div className='flex flex-1 flex-col gap-6'>
                <Button
                    className='self-end'
                    variant={'destructive'}
                    onClick={() => {
                        init();
                        setRegs(null);
                        setFlags(null);
                        setCode('');
                    }}
                >
                    Reset
                </Button>
                <CodeMirror
                    value={code}
                    onChange={(value) => setCode(value)}
                    height='400px'
                    className='shadow-lg'
                />
                <div className='flex items-center justify-between py-4'>
                    <div className='flex flex-col gap-2 w-[200px]'>
                        <Label className='text-md font-semibold text-center'>
                            Set values
                        </Label>

                        <Input
                            type='text'
                            pattern='[0-9A-Fa-f]{4}'
                            placeholder='Address'
                            value={addr}
                            onChange={(e) => setAddr(e.target.value)}
                        />
                        <Input
                            type='text'
                            pattern='[0-9A-Fa-f]{2}'
                            placeholder='Value'
                            value={addrVal}
                            onChange={(e) => setAddrVal(e.target.value)}
                        />
                        <Button onClick={onSetMemory}>Set</Button>
                    </div>
                    <div className='h-full text-center space-y-4'>
                        <div>
                            <Label className='text-md font-semibold'>
                                Enter starting address
                            </Label>
                            <Input
                                type='text'
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                pattern='[0-9A-Fa-f]{4}'
                            />
                        </div>

                        <Button
                            variant={'outline'}
                            className='bg-green-500 text-white font-bold w-full'
                            onClick={onExecute}
                        >
                            <Play className='h-4 w-4 mr-2' />
                            Execute
                        </Button>
                    </div>
                </div>

                <Results registers={regs} flags={flags} />
            </div>
        </div>
    );
};
export default Editor;
