import axios from "axios"
import api, { BASE_URL } from "../config"

export const getLeagues = async (params: LeagueParams) => {

    return api.get("/leagues", { params })

}