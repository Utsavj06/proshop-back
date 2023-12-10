import User from  "../models/userModel.js";

export const updateOrCreateUserFromOauth = async({ oauthUserInfo }) => {
    const {
        id: googleId,
        email,
        name
    } = oauthUserInfo

    const existUser = await User.findOne({email})

    if(existUser) {
        return existUser
    } else {
        const result = await User.create({
            email,
            name,
            password: googleId+name
        })

        return result
    }
}