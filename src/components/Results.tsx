const Results = ({
    registers,
}: {
    registers: Map<string, number> | null;
    memory?: string[];
    flags?: boolean[];
}) => {
    if (!registers) return <div> </div>;
    return (
        <div>
            <h2 className='text-xl font-bold'>Registers</h2>
            <div>
                {Array.from(registers.entries()).map(([key, value]) => (
                    <div className='flex items-center gap-8' key={key}>
                        <div className='w-[20px]'>{key}</div>
                        <div>{value.toString(16)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Results;
