import {SECRET_KEY} from "../config.js"
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: "1d",
                sameSite: "none",
                secure: true
            },
            (err, token) => {
                if(err) {
                    reject(err)
                }else {
                    resolve(token)
                }
            }
        )
    })
}