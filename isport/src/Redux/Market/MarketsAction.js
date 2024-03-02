import { BASEURL } from "../../BASE_url/BASE_URL";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const MarketApi = createAsyncThunk('market/MarketApi', async () => {
    try {
        const config = {
            method: 'GET',
            url: `${BASEURL}/GetMarkets?sports=1`,
            header: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(config)
        return response?.data
    } catch (error) {
        throw error;
    }
})