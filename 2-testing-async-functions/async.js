
// in order to create fetch requests in node, we need a library called axios
const axios = require('axios')



const fetchFunction = async function(id) {
    const results = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)

    return results.data
}

fetchFunction(2)



module.exports = {fetchFunction}

