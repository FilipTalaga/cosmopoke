import { getIdFromUrl, getRandomInt, getRandomSequence, mapPokemonDto, isTruthy } from './utils';

describe('Utils', () => {
    describe('#getIdFromUrl', () => {
        it('should get correct id', () => {
            const id1 = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/4/');
            const id2 = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/36');
            const id3 = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/5739/');
            const id4 = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/123456');

            expect(id1).toBe(4);
            expect(id2).toBe(36);
            expect(id3).toBe(5739);
            expect(id4).toBe(123456);
        });
    });

    describe('#getRandomInt', () => {
        it('should be between boundries', () => {
            const res1 = getRandomInt(3, 10);
            const res2 = getRandomInt(24, 63);
            const res3 = getRandomInt(1234, 52156);

            expect(res1 >= 3 && res1 <= 10).toBeTruthy();
            expect(res2 >= 24 && res2 <= 63).toBeTruthy();
            expect(res3 >= 1234 && res3 <= 52156).toBeTruthy();
        });
    });

    describe('#getRandomSequence', () => {
        it('should have correct number of elements', () => {
            const res = getRandomSequence(10, 40, 100);
            expect(res.length).toBe(10);
        });

        it('should be between boundries', () => {
            const res = getRandomSequence(10, 40, 100);
            expect(res.every(item => item >= 40 && item <= 100)).toBeTruthy();
        });
    });

    describe('#isTruthy', () => {
        it('should be truthy', () => {
            const res = isTruthy(0)
                && isTruthy('')
                && isTruthy(NaN)
                && isTruthy(true);

            expect(res).toBeTruthy();
        });

        it('should be falsy', () => {
            const res = isTruthy(null)
                || isTruthy(undefined)
                || isTruthy('false')
                || isTruthy(false);

            expect(res).toBeFalsy();
        });
    });
});
