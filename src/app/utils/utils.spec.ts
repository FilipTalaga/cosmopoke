import { getIdFromUrl } from './utils';

describe('Utils', () => {
    describe('#getIdFromUrl', () => {
        it('should be 4', () => {
            const id = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/4/');
            expect(id).toBe(4);
        });

        it('should be 36', () => {
            const id = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/36');
            expect(id).toBe(36);
        });

        it('should be 5739', () => {
            const id = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/5739/');
            expect(id).toBe(5739);
        });

        it('should be 123456', () => {
            const id = getIdFromUrl('https://pokeapi.co/api/v2/pokemon/123456');
            expect(id).toBe(123456);
        });
    });
});
