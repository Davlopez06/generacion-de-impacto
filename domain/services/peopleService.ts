/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { v4 as uuidv4 } from 'uuid';
import People from '../entities/People';

class PeopleService {
  parsePeople({ name, age, birthdate, biblePoint }: People) {
    const id = uuidv4();
    const person = new People({ id, name, age, birthdate, biblePoint });

    return [person?.id, person?.name, person?.age, person?.birthdate, person?.biblePoint?.point];
  }

  currentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}-${month}-${year}`;
  }
}

export default new PeopleService();
