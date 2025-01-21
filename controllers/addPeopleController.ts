import addPeopleUseCase from '@/aplication/usecases/addPeopleUseCase';
import { NextRequest } from 'next/server';
import sheetRepository from '@/infraestructure/repositories/sheetRepository';

const addPeopleController = async (req: NextRequest) => {
    try {
        console.log(`<<<<<<<<<<<<< START ADD PEOPLE >>>>>>>>>>>`)
        await addPeopleUseCase(req, { sheetRepository });
        console.log('<<<<<<<<<<<<< END ADD PEOPLE >>>>>>>>>>>');
    } catch (error) {
        const err = error as Error
        console.error('ERROR ADD PEOPLE:', err.message);
    }
}

export default addPeopleController;