import {cos, sec, tan} from "./trigonometric";
import {ln, log10, log2, log5} from "./logarithmic";

export function calculate(x: number, epsilon = 1e-10): number {
    if (x <= 0) {
        const tanX = tan(x, epsilon);
        const secX = sec(x, epsilon);
        const cosX = cos(x, epsilon);

        const numerator = (tanX / secX * (cosX ** 2)) + cosX - secX;
        const denominator = cosX * secX;

        if (Math.abs(denominator) < epsilon) {
            return NaN;
        }
        return numerator / denominator;
    } else {
        const log10X = log10(x, epsilon);
        const log2X = log2(x, epsilon);
        const log5X = log5(x, epsilon);
        const lnX = ln(x, epsilon);
        const numerator = ((log10X ** 3 / log10X) ** 3) - (lnX - log2X);
        const denominator = (lnX / (log10X - log10X)) - (log5X - ((log2X - log10X) * (log5X * lnX)));

        if (Math.abs(denominator) < epsilon) {
            return NaN;
        }
        return numerator / denominator;
    }
}