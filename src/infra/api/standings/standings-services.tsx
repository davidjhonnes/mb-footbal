import axios from "axios"
import api, { BASE_URL } from "../config"
import { StandingsParams } from "./interface"

export const getStandingsByLeagueSeason = async (params: StandingsParams)  => {
    return api.get("/standings", { params })

}