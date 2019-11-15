import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'http://localhost:3300',
        // headers: {
        //     username: username,
        //     password: password
        // }
    })
}

export default axiosWithAuth;