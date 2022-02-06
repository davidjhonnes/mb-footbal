import { Venue } from "./Venue";

export type Team = {
    id:Number
    name:String
    country?:String
    founded?:Number
    national?:Boolean
    logo:String
}

export interface TeamSerialized {
    team:Team,
    venue: Venue
}
