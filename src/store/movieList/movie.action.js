import { GET_DATA, 
    DELETE_DATA, 
    ADD_DATA, 
    ADD_USER_DATA,
    GET_USER_DATA } from './movie.types';



export function getData ( list ) {
    return {
        type: GET_DATA,
        payload: list
    }
}

export function deleteData ( list ) {
    return {
        type: DELETE_DATA,
        payload: list
    }
}

export function addData ( list ) {
    return {
        type: ADD_DATA,
        payload: list
    }
}

export function addUserData ( list ) {
    return {
        type: ADD_USER_DATA,
        payload: list
    }
}

export function getUserData ( list ) {
    return {
        type: GET_USER_DATA,
        payload: list
    }
}