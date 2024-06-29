import {connection} from '@/DataBase/db.config'
// import {connect} from '@/DataBase/db.config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/Helpers/mailer'

// connect()
connection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username , email, password} = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "user already exists"})
        }
        const salt = await bcryptjs.genSalt(10); 
        const hashedPass = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hashedPass
        })

        const savedUser = await newUser.save()

        console.log(savedUser);

        await sendEmail({email, emailType:"VERIFY", userId : savedUser._id})

        return NextResponse.json({
            message: "User verified",
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message})        
    }
}