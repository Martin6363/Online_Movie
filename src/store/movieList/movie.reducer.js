import { GET_DATA, 
        DELETE_DATA, 
        ADD_DATA, 
        ADD_USER_DATA, 
        GET_USER_DATA } from './movie.types';

        
const initialState = {
    movieData: [],
    userData: []
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA:
            return {
                ...state,
                movieData: action.payload
            }

        case DELETE_DATA:
            return {
                ...state,
                movieData: action.payload
            }

        case ADD_DATA:
            return {
                ...state,
                movieData: action.payload
            }

        case ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }

            default:
                return state
    }
}