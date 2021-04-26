import axios from './axios';

const UserService = {
    postRegister: async(body) => {
        try {
            const response = await axios.post("/register", body);
            return response;
        } catch (error) {
            throw error;
        }
    },
    postLogin: async(body) => {
        try {
            const response = await axios.post("/login", body);
            return response;
        } catch (error) {
            throw error;
        }
    },
    postForgetPassword: async(body) => {
        try {
            const response = await axios.post("/forget", body);
            return response;
        } catch (error) {
            throw error;
        }
    },
    postResetPassword: async(token, body) => {
        try {
            const response = await axios.post(`/reset/${token}`, body);
            return response;
        } catch (error) {
            throw error;
        }
    },
    postScanQrcode: async(body) => {
        try {
            const response = await axios.post("/scanQRcode", body);
            return response;
        } catch (error) {
            throw error;
        }
    },

}

export default UserService;