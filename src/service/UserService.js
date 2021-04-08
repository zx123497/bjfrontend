import axios from './axios';

const UserService = {
    postRegister: async (body) => {
        try{
            const response = await axios.post("/register", body);
            return response;
        } catch (error) {
            throw error;
        }
    },

}

export default UserService;