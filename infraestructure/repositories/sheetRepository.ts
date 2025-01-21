/* eslint-disable @typescript-eslint/no-explicit-any */
import { sheetClient } from '../services/google-sheet/index';

export class SheetRepository {
  async addToSheet(sheetId = '', sheetName = '', sheetData: Array<any>, startRange = 'A:E') {
    try {
      await sheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${sheetName}!${startRange}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [sheetData],
        },
      });

      console.log('Success writing in Google Sheets');
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('Unable to parse range')) {
        // Crear la hoja si no existe
        console.log(`Sheet "${sheetName}" not found. Creating it...`);
        await sheetClient.spreadsheets.batchUpdate({
          spreadsheetId: sheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: sheetName,
                  },
                },
              },
            ],
          },
        });

        console.log(`Sheet "${sheetName}" created successfully.`);

        // Reintentar escribir los datos en la hoja recién creada
        await sheetClient.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: `${sheetName}!${startRange}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [sheetData],
          },
        });

        console.log('Success writing in the newly created sheet');
      } else {
        console.error('Error writing in Google Sheets:', err.message);
        throw err;
      }
    }
  }

  async getToSheet(sheetId = '', sheetName = '') {
    try {
      const response = await sheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: sheetName,
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

// eslint-disable-next-line import/no-anonymous-default-export
export default new SheetRepository();
