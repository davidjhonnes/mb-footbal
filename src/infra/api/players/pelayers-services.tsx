import axios from "axios"
import api, { BASE_URL } from "../config"
import { PlayersParams } from "./interface"

export const getPlayersByTeamId = async (params: PlayersParams)  => {
    return api.get("/players", { params })

}

