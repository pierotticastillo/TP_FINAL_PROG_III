import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import * as authServices from '../services/auth.services.js';
import * as config from '../../config.js';

//Defino como se validan los usuarios
export const passportStrategy = new LocalStrategy({
    usernameField: 'correoElectronico',
    passwordField: 'contrasenia'
},
    async (correoElectronico, contrasenia, done) => {
        try {
            const user = await authServices.findUser(correoElectronico, contrasenia);
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return done(null, user, { message: 'Login correcto!' });
            }
        } catch (exc) {
            done(exc);
        }
    }
);

//Defino como se validan los tokens
export const passportValidity = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
},
    async (jwtPayload, done) => {
        const user = await authServices.findById(jwtPayload.idUsuario);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Token incorrecto.' });
        }
    }
);