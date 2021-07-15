import axios from './axios'

const RoomService = {
    postCreateRoom: async (body) => {
        try {
            const response = await axios.post('/createRoom', body)
            return response
        } catch (error) {
            throw error
        }
    },
    getRooms: async (email) => {
        try {
            const response = await axios.post('/getRoomList', email)
            return response
        } catch (error) {
            throw error
        }
    },
    deleteRoom: async (id) => {
        try {
            const response = await axios.post(`/deleteRoom/${id}`)
            return response
        } catch (error) {
            throw error
        }
    },
    showRoom: async (id) => {
        try {
            const response = await axios.post(`/showRoom/${id}`)
            return response
        } catch (error) {
            throw error
        }
    },
    postEditRoom: async (body, id) => {
        try {
            const response = await axios.post(`/editRoom/${id}`, body)
            return response
        } catch (error) {
            throw error
        }
    },
}

export default RoomService
