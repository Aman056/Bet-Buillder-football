import { BASEURL } from "../../BASE_url/BASE_URL";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const GetFixtureData = createAsyncThunk('fixture/GetFixtureData', async () => {
    try {
        const config = {
            method: 'GET',
            url: `${BASEURL}/GetFixtures?sports=1`,
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