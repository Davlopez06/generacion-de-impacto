import { SheetRepository } from '@/infraestructure/repositories/sheetRepository';
import { NextRequest } from 'next/server';
import peopleService from '@/domain/services/peopleService';

interface Repositories {
  sheetRepository?: SheetRepository;
}

const addPeopleUseCase = async (req: NextRequest, { sheetRepository }: Repositories) => {
  try {
    const { name = '', age = 0, birthdate = '', biblePoint = {} } = await req.json();

    const parsePeople = peopleService.parsePeople({ name, age, birthdate, biblePoint });
    console.log('parsePeople', parsePeople)
    const currentDate = peopleService.currentDate();
    await sheetRepository?.addToSheet('1Y-5S4klEC2ZwRxir1HWgFY1HPBGXtOAFdmCn-ZocLV0', currentDate, parsePeople);
    await sheetRepository?.addToSheet('1Y-5S4klEC2ZwRxir1HWgFY1HPBGXtOAFdmCn-ZocLV0', 'Puntos Anual', parsePeople);
  } catch (error) {
    const err = error as Error;
    console.error('ERROR ADD PEOPLE CASE:', err.message);
  }
};

export default addPeopleUseCase;
