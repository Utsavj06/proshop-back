import { getGoogleOauthUrl } from '../utils/getGoogleOAuthUrl.js';

export const getGoogleOauthUrlRoute =  (req, res) => {
    const url = getGoogleOauthUrl()
    res.status(200).json({ url })
}