export function ln(x: number, epsilon = 1e-10): number {
    if (x <= 0) {
        return NaN;
    }
    let val = x - 1;
    let sum = 0;
    let term = val;
    for (let n = 1; Math.abs(term / n) > epsilon; n++) {
        sum += term / n;
        term *= -val;
    }
    return sum;
}

export function log2(x: number, epsilon = 1e-10): number {
    return ln(x, epsilon) / ln(2, epsilon);
}

export function log5(x: number, epsilon = 1e-10): number {
    return ln(x, epsilon) / ln(5, epsilon);
}

export function log10(x: number, epsilon = 1e-10): number {
    return ln(x, epsilon) / ln(10, epsilon);
}