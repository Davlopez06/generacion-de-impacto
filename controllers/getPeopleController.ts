import sheetRepository from '@/infraestructure/repositories/sheetRepository';
import getPeopleUseCase from '@/aplication/usecases/getPeopleUseCase';
import { NextRequest } from 'next/server';

const getPeopleController = async (req: NextRequest) => {
    try {
        console.log(`<<<<<<<<<<<<< START GET PEOPLE >>>>>>>>>>>`)
        const response = await getPeopleUseCase(req, { sheetRepository });
        console.log('<<<<<<<<<<<<< END GET PEOPLE >>>>>>>>>>>');
        return response;
    } catch (error) {
        const err = error as Error
        console.error('ERROR GET PEOPLE:', err.message);
        return []
    }
}

export default getPeopleController;