import axios from "axios"
import api, { BASE_URL } from "../config"
import { TeamsParams, TeamsSatisticsParams } from "./interface"

export const getTeamsDetails = async (params: TeamsParams)  => {
    return api.get("/teams", { params })

}

export const getTeamsStatistics = async (params: TeamsSatisticsParams)  => {
    return api.get("/teams/statistics", { params })
}