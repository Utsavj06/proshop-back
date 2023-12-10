import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config();

export const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/auth/google/callback',
)