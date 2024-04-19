import { useState } from 'react';
import { registers } from '../8085-lib/init';
import { Input } from './ui/input';

const Registers = () => {
    const [reg, setReg] = useState(registers);

    const handleChange = (
        key: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let value = e.target.value;
        if (e.target.value.length > 2)
            value = value.substring(0, value.length - 2);
        const newValue = parseInt(value, 16);
        setReg(
            (prevReg) =>
                new Map(prevReg.set(key, !isNaN(newValue) ? newValue : 0)),
        );
    };
    return (
        <div className='mt-4 space-y-2'>
            {Array.from(reg.entries()).map(([key, value]) => (
                <div className='flex items-center gap-8' key={key}>
                    <div className='w-[20px]'>{key}</div>
                    <Input
                        type='text'
                        value={
                            value.toString(16).length == 2
                                ? value.toString(16)
                                : '0' + value.toString(16)
                        }
                        onChange={(e) => handleChange(key, e)}
                        className='shadow-md w-16'
                    />
                </div>
            ))}
        </div>
    );
};
export default Registers;
