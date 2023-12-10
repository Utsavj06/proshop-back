import jwt from "jsonwebtoken";
import { getGoogleUser } from "../utils/getGoogleUser.js";
import { updateOrCreateUserFromOauth } from "../utils/UpdateOrCreateUserFromOauth.js";
import generateToken from '../utils/generateToken.js';

export const getGoogleAuthCallback = async (req, res) => {
    const { code } = req.query;

    const oauthUserInfo = await getGoogleUser({ code });
    const updateUser = await updateOrCreateUserFromOauth({ oauthUserInfo })
    const { _id: id,  email, name, } = updateUser;

    const token =  generateToken(res, id, email, name)

    res.redirect(`http://localhost:3000/login?token=${token}&name=${name}&email=${email}`)
}