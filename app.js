/*
*  MAIN APPLICATION
***************************************************************** */
    var express = require('express')
         , http = require('http')
         , cons = require('consolidate')
         , path = require('path')
         , swig = require('swig')


    var app = express();
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        //SETUP SWIG
            swig.init({
                root: __dirname, //setting to the root of this project: /
                allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
            });
            app.set('views', __dirname);
            app.engine('.html', cons.swig);
            app.set('view engine', 'html');      
        app.use(express.favicon());
        app.use(express.logger('dev'));
      //  app.use(express.bodyParser({ uploadDir:__dirname + '/public/' }));
        app.use(express.methodOverride());
        app.use(express.cookieParser('your secret here'));
        app.use(express.session());
        app.use(app.router);
    });

    app.configure('development', function(){
      app.use(express.errorHandler());
    });

    

    app.get('/',function(req,res)
    {
        res.render(__dirname +'/view/home.html', { title: 'Welcome', name: "You" });
    });


/* START SERVER 
*****************************************************************************************/
    var server = http.createServer(app).listen(app.get('port'), function(){

        console.log("Express server listening on port " + app.get('port'));

    });
