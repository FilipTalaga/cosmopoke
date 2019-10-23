export interface PokeapiResultDto {
    name: string;
    url: string;
}

export default interface PokeapiDto {
    count: number;
    next: string;
    previous: string;
    results: PokeapiResultDto[];
}
