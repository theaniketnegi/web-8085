import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CodeMirror from '@uiw/react-codemirror';
import { toast } from 'sonner';
import { execute } from '@/8085-lib/execute';
import { validateAddr, validateAddrString } from '@/8085-lib/utils';

const Editor = () => {
    const [code, setCode] = useState('');
    const [value, setValue] = useState('0000');

    const onExecute = () => {
        if (code.trim() === '') {
            toast.error('Code is required');
            return;
        }
        if (!validateAddr(parseInt(value, 16)) || !validateAddrString(value)) {
            toast.error('Invalid address');
            return;
        }
        execute(code, value);
    };

    return (
        <div className='flex-1 mt-8 w-[50%] mx-auto flex space-x-72 p-5'>
            <div className='flex flex-1 flex-col gap-6'>
                <CodeMirror
                    value={code}
                    onChange={(value) => setCode(value)}
                    height='400px'
                    className='shadow-lg'
                />
                <div className='w-[200px] self-end'>
                    <Label className='text-md font-semibold'>
                        Enter starting address
                    </Label>
                    <Input
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <Button
                    variant={'outline'}
                    className='bg-green-500 text-white font-bold self-end'
                    onClick={onExecute}
                >
                    <Play className='h-4 w-4 mr-2' />
                    Execute
                </Button>
            </div>
        </div>
    );
};
export default Editor;
