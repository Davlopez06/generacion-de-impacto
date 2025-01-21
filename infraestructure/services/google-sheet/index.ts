import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS || ''),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const sheetClient = google.sheets({ version: 'v4', auth });