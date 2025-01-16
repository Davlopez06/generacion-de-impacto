import { google } from 'googleapis';
import CREDENTIALS from './sheet.json';

const auth = new google.auth.GoogleAuth({
  credentials: CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const sheetClient = google.sheets({ version: 'v4', auth });