import { GET_ERRORS, CLEAR_ERRORS } from './types'


//return errors
export const returnErrors = (msg, status, id = null) => {

    try {

        const a = JSON.parse(msg.msg)
        msg = a;
        return {
            type: GET_ERRORS,
            payload: { msg, status, id }
        }
    }
    catch (error) {

        return {
            type: GET_ERRORS,
            payload: { msg, status, id }
        }
    }
}

//claer errors
export const claerErrors = () => {

    return {
        type: CLEAR_ERRORS
    }
}