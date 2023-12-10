import axios from "axios";
import { oauthClient } from "./oAuthClient.js";

const getAccessAndBearerToken = ({accessToken}) => 
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

export const getGoogleUser = async({code}) => {
    const {res} = await oauthClient.getToken(code);

    const response = await axios.get(
        getAccessAndBearerToken({accessToken: res.data.access_token}),
        {headers: {Authorization: `Bearer ${res.data.id_token}`}}
    )

    return response.data;
}