export function cos(x: number, epsilon: number = 1e-10): number {
    x = x % (2 * Math.PI);
    let sum = 0;
    let term = 1;
    let n = 0;
    do {
        sum += term;
        term *= -x * x / ((2 * n + 2) * (2 * n + 1));
        n++;
    } while (Math.abs(term) > epsilon);
    return sum;
}

export function sin(x: number, epsilon = 1e-10): number {
    return cos(Math.PI/2 - x, epsilon);
}

export function tan(x: number, epsilon = 1e-10): number {
    const c = cos(x, epsilon);
    if (Math.abs(c) < epsilon) {
        return NaN;
    }
    return sin(x, epsilon) / c;
}

export function sec(x: number, epsilon = 1e-10): number {
    const c = cos(x, epsilon);
    if (Math.abs(c) < epsilon) {
        return NaN;
    }

    return 1 / c;
}