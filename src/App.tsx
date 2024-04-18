import CodeMirror from '@uiw/react-codemirror';
import { Header } from './components/Header';
import { Button } from './components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { flag, registers } from './8085-lib/init';
import { Checkbox } from './components/ui/checkbox';

const flagLabels = ['CY', 'P', 'AC', 'X', 'Z', 'S'];

export default function App() {
    const [code, setCode] = useState('');

    return (
        <main className='flex flex-col h-full'>
            <Header />
            <div className='flex-1 mt-8 w-[90%] mx-auto flex space-x-72 p-5'>
                <div className='space-y-8'>
                    <div>
                        <div className='font-semibold text-xl'>Registers</div>
                        <div className='mt-4'>
                            {Array.from(registers.entries()).map(
                                ([key, value]) => (
                                    <div
                                        className='flex items-center gap-8'
                                        key={key}
                                    >
                                        <div className='w-[20px]'>{key}</div>
                                        <div>{value.toString(16)}</div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='font-semibold text-xl'>Flags</div>
                        <div className='mt-4'>
                            {flagLabels.map((label, i) => {
                                return (
                                    <div
                                        className='flex items-center gap-8'
                                        key={label}
                                    >
                                        <div className='w-[20px]'>{label}</div>
                                        <Checkbox checked={flag[i]} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-6'>
                    <CodeMirror
                        value={code}
                        onChange={(value) => setCode(value)}
                        height='400px'
                        className='shadow-lg'
                    />
                    <Button
                        variant={'outline'}
                        className='bg-green-500 text-white font-bold self-end'
                    >
                        <Play className='h-4 w-4 mr-2' />
                        Execute
                    </Button>
                </div>
                <div className='flex-1'>
                    <div className='font-semibold text-xl'>Memory</div>
                </div>
            </div>
        </main>
    );
}
