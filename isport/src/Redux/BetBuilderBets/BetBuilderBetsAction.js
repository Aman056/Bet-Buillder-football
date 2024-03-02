import { BASEURL } from "../../BASE_url/BASE_URL";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const BetBuilder = createAsyncThunk('market/BetBuilder', async (data) => {
    try {
        const config = {
            method: 'GET',
            url: `${BASEURL}/GetBetBuilderBets?sports=1&matchId=${data?.matchId}&marketId=${data?.marketId}&legs=${data?.legs}&language=en`,
            header: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(config)
        return response.data
    } catch (error) {
        throw error;
    }
})