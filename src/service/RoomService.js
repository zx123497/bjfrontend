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
}

export default RoomService
