const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const path = require( 'path' );
require( 'dotenv' ).config();

const fileExtLimiter = require( './middleware/fileExtLimiter' );
const fileSizeLimiter = require( './middleware/fileSizeLimit' );
const filesPayloadExists = require( './middleware/filesPayloadExists' );


const PORT = process.env.PORT;
const hostname = '127.0.0.1';

const app = express();

app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'index.html' ) );
} );

app.post( '/upload', fileUpload( { createParentPath: true } ),
    filesPayloadExists,
    fileExtLimiter( [ '.png', '.jpg', '.jpeg' ] ),
    fileSizeLimiter,
    ( req, res ) => {
        const files = req.files;
        console.log( files );

        Object.keys( files ).forEach( key => {
            // CREATING A 'FILES' FOLDER IN OUR WORKSPACE FOR THE UPLOADED FILES
            const filepath = path.join( __dirname, 'files', files[ key ].name );

            files[ key ].mv( filepath, ( err ) => {
                if(err) return res.status(500).json({status: "error", message: err})
            })

        })

        return res.json( { status: 'succes', message: Object.keys(files).toString() } );
    } );

app.listen( PORT, hostname, () => {
    console.log( `Server started on PORT: http://${ hostname }:${ PORT }` );
} );
