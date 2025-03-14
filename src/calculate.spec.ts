import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { calculate } from './calculate';
import * as trigonometric from './trigonometric';
import * as logarithmic from './logarithmic';

describe('Calculator Integration Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Полные моки (тригонометрия + логарифмы)', () => {
        beforeEach(() => {
            jest.spyOn(trigonometric, 'cos').mockImplementation((x) => Math.cos(x));
            jest.spyOn(trigonometric, 'tan').mockImplementation((x) => Math.tan(x));
            jest.spyOn(trigonometric, 'sec').mockImplementation((x) => 1 / Math.cos(x));

            jest.spyOn(logarithmic, 'ln').mockImplementation((x) => Math.log(x));
            jest.spyOn(logarithmic, 'log10').mockImplementation((x) => Math.log10(x));
            jest.spyOn(logarithmic, 'log2').mockImplementation((x) => Math.log2(x));
            jest.spyOn(logarithmic, 'log5').mockImplementation((x) => Math.log(x)/Math.log(5));
        });

        test('x <= 0 (тригонометрическая часть)', () => {
            const x = -Math.PI/4;
            const expected = ((Math.tan(x)/ (1/Math.cos(x))) * (Math.cos(x) ** 2) + Math.cos(x) - (1/Math.cos(x))) / (Math.cos(x) * (1/Math.cos(x)));

            const result = calculate(x);
            expect(result).toBeCloseTo(expected, 2);


            expect(trigonometric.sec).toHaveBeenCalledTimes(1);
        });

        test('x > 0 (логарифмическая часть)', () => {
            const x = 10;
            const result = calculate(x);
            expect(result).toBeCloseTo(0); // fuck js
        });
    });

    describe('Только моки логарифмов (x > 0)', () => {
        beforeEach(() => {
            jest.spyOn(logarithmic, 'ln').mockImplementation((x) => Math.log(x));
            jest.spyOn(logarithmic, 'log10').mockImplementation((x) => Math.log10(x));
            jest.spyOn(logarithmic, 'log2').mockImplementation((x) => Math.log2(x));
            jest.spyOn(logarithmic, 'log5').mockImplementation((x) => Math.log(x)/Math.log(5));

            jest.unmock('./trigonometric');
        });

        test('x = 1', () => {
            const result = calculate(1);

            expect(trigonometric.cos).not.toHaveBeenCalled();

            expect(result).toBeNaN();
        });
    });

    describe('Без моков (реальные реализации)', () => {
        test('x = 0 (тригонометрическая часть)', () => {
            const result = calculate(0);
            expect(result).toBeCloseTo(0, 2);
        });

        test('x = 100 (логарифмическая часть)', () => {
            const result = calculate(100);
            expect(result).toBeCloseTo(0);
        });

        test('x = -Math.PI/3 (тригонометрическая часть)', () => {
            const result = calculate(-Math.PI/3);
            expect(result).toBeCloseTo(-1.716, 2);
        });
    });
});