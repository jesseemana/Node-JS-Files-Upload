// MIDDLEWARE FOOR MAKING SURE WE DON'T EXCEED A FILE SIZE OF 5MB

//FILE SIZE LIMIT
const MB = 5; 

// CREATES THE 5MB SIZE LIMIT
const FILE_SIZE_LIMIT = MB * 1024 * 1024; 

const fileSizeLimiter = ( req, res, next ) => {
    const files = req.files;

    // AN ARRAY HOLDING ALL OUR FILES OVER THE FILE UPLOAD LIMIT
    const filesOverLimit = [];

    // WHICH FILES ARE OVER LIMIT
    Object.keys( files ).forEach( key => {
        if ( files[ key ].size > FILE_SIZE_LIMIT )
        {
            filesOverLimit.push( files[ key ].name );
        }
    } );

    if ( filesOverLimit.length ) {
        // IF THERE ARE MORE THAN ONE FILES SELECTED USE 'is' NOT 'are' IN ERROR MESSAGE
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        // THE SENTENCE SHOWN IN ERROR MESSAGE WHEN AN ERROR OCCURS DURING UPLOAD
        const sentence = `Upload failed. ${ filesOverLimit.toString() } ${ properVerb } over the file size limit of ${ MB } MB.`.replaceAll( ",", ", " );

        // THE ERROR MESSAGE 
        const message = filesOverLimit.length < 3
            ? sentence.replace( ",", " and" )
            : sentence.replace( /,(?=[^,]*$)/, " and" );
        
        return res.status( 413 ).json( { status: "error", message } );
    }


    next();
};

module.exports = fileSizeLimiter;
