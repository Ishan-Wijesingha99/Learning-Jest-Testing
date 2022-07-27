
// in order to test asynchronous functions in javascript, we need to download a library called axios
const axios = require('axios')



const fetchFunction = async function(id) {
    const results = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)

    return results.data
}

fetchFunction(2)



module.exports = {fetchFunction}

