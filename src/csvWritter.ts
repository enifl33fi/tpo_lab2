import fs from 'fs';

type ModuleFunction = (x: number, epsilon?: number) => number;

export function writeModuleToCSV(
    moduleFunc: ModuleFunction,
    start: number,
    end: number,
    step: number,
    filename: string,
    epsilon: number = 1e-10,
    delimiter: string = ','
): void {
    let content = `X${delimiter}Result\n`;

    for (let x = start; x <= end; x = Number((x + step).toFixed(10))) {
        try {
            const result = moduleFunc(x, epsilon);
            content += `${x}${delimiter}${Number.isNaN(result) ? 'NaN' : result.toExponential(10)}\n`;
        } catch (e) {
            content += `${x}${delimiter}NaN\n`;
        }
    }

    fs.writeFileSync(filename, content);
}