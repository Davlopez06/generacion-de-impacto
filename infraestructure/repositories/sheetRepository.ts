import { sheetClient } from '../services/google-sheet/index';

class SheetRepository {
  async writeToSheet(sheetId = '', sheetName = '', sheetData = [], startRange = 'A1') {
    try {
      await sheetClient.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${sheetName}!${startRange}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: sheetData,
        },
      });

      console.log('Success writing in Google Sheets');
    } catch (error) {
      const err = error as Error;
      console.error('Error writing in Google Sheets:', err.message);
      throw err;
    }
  }

  async getToSheet(sheetId = '', sheetName = '') {
    try {
      const response = await sheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheetName}!`,
      });

      const values = response.data.values;

      if (!values || values.length === 0) {
        console.log('No data found in the sheet.');
        return [];
      }

      console.log('Success fetching all data from the sheet:', values);
      return values;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching data from the sheet:', err.message);
      throw err;
    }
  }
}
module.exports = new SheetRepository();
