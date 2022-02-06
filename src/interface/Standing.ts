import { League } from "./League";

export type Standing = {
    rank:number,
    team:{
        id:number,
        name:string,
        logo:string,
    },
    points:Number,
    goalsDiff:Number,
    group:String,
    form:String,
    status:String,
    description:String,
    all:{
        played:Number,
        win:Number,
        draw:Number,
        lose:Number,
        goals:{
            for:Number,
            against:Number,
        }
    }
    home:{
        played:Number,
        win:Number,
        draw:Number,
        lose:Number,
        goals:{
            for:Number,
            against:Number,
        }
    }
    away:{
        played:Number,
        win:Number,
        draw:Number,
        lose:Number,
        goals:{
            for:Number,
            against:Number,
        }
    },
    update:String
}

export interface StandingSerialized extends League{
    
        country:String,
        flag:String,
        season:Number,
        standings: Standing[]
   

}

export interface StandingResponse{
    
    league: StandingSerialized

}