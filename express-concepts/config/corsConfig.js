const cors = require('cors')


const configureCors = () =>{
    return cors({
        //first we return the origin - this will tell which origins you want it to be accessed by users  in the api
        origin:(origin,callback)=>{
            const allowedOrigins = [
                'http://localhost:3000',
                
            ]
        }

    })
}