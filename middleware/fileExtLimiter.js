// MIDDLEWARE FOR CHECKING THE FILE EXTENSIONS ALLOWED IN OUR APP 
const path = require( 'path' );

// ACCECPTS AN ARRAY OF ALLOWED EEXTENSIONS 
const fileExtLimiter = (allowedExtArray) => {
    return ( req, res, next ) => {
        const files = req.files;

        const fileExtensions = []

        //CREATING A FILES OBJECT FROM THE FILES WE GOT FROM THE REQUEST
        Object.keys( files ).forEach( key => {
            // GETTING THE EXTENSION FILENAME OF EACH FILE INSIDE THE FILES OBJECT AND PUSHING INTO THE FILEEXTENSIONS ARRAY 
            fileExtensions.push(path.extname(files[key].name))
        } )
        
        // ARE THE FILE EXTENSIONS ALLOWED? 
        const allowed = fileExtensions.every( ext => allowedExtArray.includes( ext ) )
        
        if ( !allowed ) {
            const message = `Upload failed. Only ${ allowedExtArray.toString() } files allowed.`.replaceAll( ",", ", " );

            return res.status( 422 ).json( { status: "error", message } );
        }

        next()
    };
}

module.exports = fileExtLimiter
