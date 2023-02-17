const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const path = require( 'path' );
require( 'dotenv' ).config();


const PORT = process.env.PORT;
const hostname = '127.0.0.1';

const app = express();

app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'index.html' ) );
} );

app.post( '/upload', fileUpload( { createParentPath: true } ), ( req, res ) => {
    const files = req.files;
    console.log( files );

    return res.json( { status: 'logged', message: 'logged' } );
} );

app.listen( PORT, hostname, () => {
    console.log( `Server started on PORT: http://${ hostname }:${ PORT }` );
} );
