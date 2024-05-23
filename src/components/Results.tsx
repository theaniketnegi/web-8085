import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    convertToNum,
    validateAddr,
    validateAddrString,
} from '@/8085-lib/utils';
import { get } from '@/8085-lib/init';
import { toast } from 'sonner';

const Results = ({
    registers,
    flags,
}: {
    registers: Map<string, number> | null;
    flags: boolean[] | null;
}) => {
    const [addr, setAddr] = useState('');
    const getAddr = () => {
        if (validateAddr(convertToNum(addr)) && validateAddrString(addr)) {
            const val = get(convertToNum(addr));
            toast.success(`${addr} : ${val}`);
            setAddr('');
        } else {
            toast.error('Invalid address');
        }
    };
    if (!registers || !flags) return <div> </div>;

    return (
        <div>
            <h1 className='text-3xl font-bold mb-3 text-underlin'>Results</h1>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Registers</h2>
                    <div>
                        {Array.from(registers.entries()).map(([key, value]) => (
                            <div className='flex items-center gap-8' key={key}>
                                <div className='w-[20px]'>{key}</div>
                                <div>{value.toString(16)}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Flags</h2>
                    <div>
                        <div className='flex items-center gap-8'>
                            <div className='w-[20px]'>C</div>
                            <div>{flags[0] ? 1 : 0}</div>
                        </div>
                        <div className='flex items-center gap-8'>
                            <div className='w-[20px]'>P</div>
                            <div>{flags[1] ? 1 : 0}</div>
                        </div>
                        <div className='flex items-center gap-8'>
                            <div className='w-[20px]'>AC</div>
                            <div>{flags[2] ? 1 : 0}</div>
                        </div>
                        <div className='flex items-center gap-8'>
                            <div className='w-[20px]'>Z</div>
                            <div>{flags[3] ? 1 : 0}</div>
                        </div>
                        <div className='flex items-center gap-8'>
                            <div className='w-[20px]'>S</div>
                            <div>{flags[4] ? 1 : 0}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Memory</h2>
                    <div className='h-full space-y-4'>
                        <div>
                            <Label className='text-md font-semibold'>
                                Enter address
                            </Label>
                            <Input
                                type='text'
                                pattern='[0-9A-Fa-f]{4}'
                                value={addr}
                                onChange={(e) => setAddr(e.target.value)}
                            />
                        </div>

                        <Button className='font-bold w-full' onClick={getAddr}>
                            Get
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Results;
