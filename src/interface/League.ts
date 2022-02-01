import { Country } from "./Country";
import { Season } from "./Season";

export type League = {
    id: string,
    name:string,
    typ:string,
    logo:string
}

export interface LeagueSerialized {
    league: League
    country: Country
    seasons: Season[]
}