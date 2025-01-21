import addPeopleController from '@/controllers/addPeopleController';
import getPeopleController from '@/controllers/getPeopleController';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await addPeopleController(req);
        return NextResponse.json({Message: 'ADD PEOPLE SUCCESS'})
    } catch (error) {
        const err = error as Error
        console.error('ERROR ADD PEOPLE ROUTE:', err.message);
        return NextResponse.json({Message: 'ERROR ADD PEOPLE ROUTE'})
    }
}

export async function GET(req: NextRequest) {
    try {
        const response = await getPeopleController(req);
        return NextResponse.json({data: response})
    } catch (error) {
        const err = error as Error
        console.error('ERROR ADD PEOPLE ROUTE:', err.message);
        return NextResponse.json({Message: 'ERROR ADD PEOPLE ROUTE'})
    }
}