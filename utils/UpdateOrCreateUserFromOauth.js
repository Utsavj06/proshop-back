import User from  "../models/userModel.js";

export const updateOrCreateUserFromOauth = async({ oauthUserInfo }) => {

    console.log(oauthUserInfo)
    const {
        id: googleId,
        email,
        name
    } = oauthUserInfo

    // const db = getDbConnection('react-auth-db')
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