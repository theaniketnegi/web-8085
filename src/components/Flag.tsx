import { flag } from "@/8085-lib/init";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const flagLabels = ['CY', 'P', 'AC', 'X', 'Z', 'S'];

const Flag = () => {
    const [flags, setFlags] = useState(flag);

    return (
        <div className='mt-4'>
            {flagLabels.map((label, i) => {
                return (
                    <div className='flex items-center gap-8' key={label}>
                        <div className='w-[20px]'>{label}</div>
                        <Checkbox
                            checked={flags[i]}
                            onCheckedChange={() => {
                                setFlags((prev) =>
                                    prev.map((state, j) =>
                                        i !== j ? state : !state,
                                    ),
                                );
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default Flag;
