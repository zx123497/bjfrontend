import axios from './axios'

const AdminService = {
    postAssignRole: async(body) => {
        try {
            const response = await axios.post('/assignRole', body)
            return response
        } catch (error) {
            throw error
        }
    },
    postChangeSingleMoney: async(body) => {
        try {
            const response = await axios.post('/changeSingleMoney', body)
            return response
        } catch (error) {
            throw error
        }
    },
    postTotalChartData: async(body) => {
        try {
            const response = await axios.post('/startGameTime', body)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default AdminService