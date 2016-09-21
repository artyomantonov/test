/*
 * Copyright 2014 The MITRE Corporation, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this work except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * author Dave Bryson
 * @flow
 */
import XYZ from '../xyz'
import Express from 'express'
import BodyParser from 'body-parser'
import MethodOverride from 'method-override'
import CookieParser from 'cookie-parser'
import Passport from 'passport'
import Session from 'express-session'
import ConnectMongo from 'connect-mongo'
import Consolidate from 'consolidate'
import Path from 'path'
import Morgan from 'morgan'
import LogRouter from '../../app/routes/log'
import ApiRouter from '../../app/routes/api'
import ConsoleRouter from '../../app/routes/console'
import WebClientRouter  from '../../app/routes/webclient'
import configurePassport from './passport'

const
    mongoStore = ConnectMongo({
        session: Session
    })


const app = Express()

app.use((req, res, next) => {
    res.locals.url = req.protocol + ':// ' + req.headers.host + req.url
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, destroy_world_token');
    next()
})

// Set swig as the template engine
app.engine('server.view.html', Consolidate['swig'])
app.set('view cache', false)

// Set views path and view engine
app.set('view engine', 'server.view.html')
app.set('views', __dirname + '/../../app/views')

// Setup middleware
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))
app.use(MethodOverride())

// CookieParser should be above session
app.use(CookieParser())
// Express MongoDB session storage
app.use(Session({
    secret: XYZ.config.get('session_secret'),
    cookie: {maxAge: 3600000}, // 1 hour
    unset: 'destroy',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: XYZ.mongoose.connection,
        collection: 'webconsole_sessions'
    })
}))

Morgan.token('remote-user', (req, res) => res.logUsername)
Morgan.token('message', (req, res) => res.logMessage)
app.use(Morgan(':remote-addr - :remote-user ":method :url" :status ":message"', {'stream': XYZ.logger.stream}))
// debug logger

// use passport session
app.use(Passport.initialize())
app.use(Passport.session())
configurePassport()


app.use(Express.static(Path.resolve(__dirname + '/../../../../public/js/dist')))

// Load routes
LogRouter(app)
ApiRouter(app)
ConsoleRouter(app)
WebClientRouter(app)

// Assume 404 since no middleware responded
app.use((req, res) => {
    res.render('index', {user: req.user || null})
});



export default app
