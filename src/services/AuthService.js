const axios = require('axios');

export async function getAuthProofs(wallet) {
    
    try {            
        return (await axios.get(`login/${wallet}`)).data;
    }    
    catch (error) {
        return [];
    }
}