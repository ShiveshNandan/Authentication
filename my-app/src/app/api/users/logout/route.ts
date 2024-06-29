import {connection} from '@/DataBase/db.config'
// import {connect} from '@/DataBase/db.config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/Helpers/mailer'
import JWT from "jsonwebtoken"

// connect()
connection()
 