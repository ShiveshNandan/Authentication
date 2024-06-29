import {connection} from '@/DataBase/db.config'
// import {connect} from '@/DataBase/db.config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/Helpers/mailer'
import JWT from "jsonwebtoken"

// connect()
connection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "user doesnt exists"})
        }
        console.log("user exists")

        const validPassword = bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "check your credentials ! "})
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: email.email
        }

        const token = JWT.sign(tokenData, process.env.TOKEN!, { expiresIn: '1h'})

        const response = NextResponse.json({
            message: "logged In Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message})
    }
}