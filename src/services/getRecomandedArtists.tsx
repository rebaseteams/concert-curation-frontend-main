import axios from 'axios';

const baseURL = 'http://localhost:4000'

const getRecomendedArtists = async (data: any) => {
    const response = await axios.post( `${baseURL}/recommender/api/getMatchData/`, data)
    return response.data;
}

export {getRecomendedArtists}