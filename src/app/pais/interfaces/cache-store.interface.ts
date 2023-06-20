import { Country } from "./pais.interface";


export interface CacheStore {
    porCapital: TermCountries;
    porPais:    TermCountries;
    porRegion:  TermCountries;
}

export interface TermCountries {
    term: string;
    countries: Country[];
}
