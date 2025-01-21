import { SheetRepository } from '@/infraestructure/repositories/sheetRepository';
import { NextRequest } from 'next/server';

interface Repositories {
  sheetRepository?: SheetRepository;
}

const getPeopleUseCase = async (req: NextRequest ,{ sheetRepository }: Repositories) => {
  try {
    const { searchParams } = new URL(req.url);
    const sheetName = searchParams.get('sheetName') || 'Puntos Anual';
    const data = await sheetRepository?.getToSheet('1Y-5S4klEC2ZwRxir1HWgFY1HPBGXtOAFdmCn-ZocLV0', sheetName);
    return data;
  } catch (error) {
    const err = error as Error;
    console.error('ERROR GET PEOPLE CASE:', err.message);
    return [];
  }
};

export default getPeopleUseCase;
