const { registerServices, loginServices, getProfileServices, updateProfileServices, changePasswordServices, deleteProfileServices } = require('../services/auth')
const register = async (req, res, next) => {
    try {
        const user = await registerServices(req.body)
        const authToken = user.signAuthToken();
        const refreshToken = user.signRefreshToken();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            signed: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({
            success: true,
            token: authToken,
            data: user
        })
    }
    catch (err) {
        next(err)
    }
}
const login = async (req, res, next) => {
    try {
        const {email,password} = req.body
        const { user, authToken, refreshToken } = await loginServices({email,password})
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            signed: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({
            success: true,
            token: authToken,
            data: user
        })
    }
    catch (err) {
        next(err)
    }
}

const getProfile = async (req, res, next) => {
    try {
        const user = await getProfileServices(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err)
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const user = await updateProfileServices(req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });
    }
    catch (err) {
        next(err)
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await changePasswordServices(req.user.id, currentPassword, newPassword);
        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    }
    catch (err) {
        next(err)
    };
}

const deleteProfile = async (req, res, next) => {

    try {
        await deleteAccountServices(req.user.id);
        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    }
    catch (err) {
        next(err)
    }
};

module.exports = { login, register, getProfile, updateProfile, changePassword, deleteProfile }