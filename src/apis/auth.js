import axios from "@/axios";

export const login = async ({ email, password }) => {
    try {
        let res = await axios.post('/auth/login', { email, password })
        // console.log(res)
        if (res.status == 200) {
            // axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;
            return res.data
        } else {
            throw new Error(res.data.code)
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        let res = await axios.post('/auth/logout')
        // console.log(res)
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data.code)
        }
    } catch (error) {
        console.log(error)
    }
}

export const registerEmployee = async ({ email, roleName, name }) => {
    try {
        let res = await axios.post("/auth/register-employee", {
            email, roleName, name
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const registerAdmin = async ({ email, password, companyData }) => {
    try {
        let res = await axios.post("/auth/register-admin", {
            email, password, companyData
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}
export const regiserUser = async ({ email, password, name, phone }) => {
    try {
        let res = await axios.post('/auth/register-user', {
            email, password, name, phone
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async () => {
    try {
        let res = await axios.get('/auth/me');
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res)
        }
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async ({ oldPass, newPass }) => {
    try {
        let res = await axios.post('/auth/change-password', {
            oldPass, newPass
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const forgotPassword = async ({ email }) => {
    try {
        let res = await axios.post('/auth/forgot-password', {
            email
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}