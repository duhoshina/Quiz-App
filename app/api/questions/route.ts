import { createResponse } from '@/utils/createResponse';
import data from './data.json';

function getAgeParam(request: Request): number | null {
    const url = new URL(request.url);
    const ageParam = url.searchParams.get('age');

    if (ageParam === null || isNaN(Number(ageParam))) {
        return null;
    };
    
    return Number(ageParam);
};

function isValidAge(age: number): boolean {
    return age >= 18;
};

export async function GET(request: Request) {
    const url = new URL(request.url);

    const ageParam = url.searchParams.get('age');
    const limitParam = Number(url.searchParams.get('limit'));

    try {
        const age = getAgeParam(request);

        if (age === null) {
            return createResponse(400, {
                response_code: 1,
                message: 'Idade não fornecida ou inválida.',
            });
        };

        if (!isValidAge(age)) {
            return createResponse(400, {
                response_code: 1,
                message: 'Idade deve ser maior que 18.',
            });
        };

        if(limitParam) {
            return createResponse(200, {
                response_code: 0,
                results: data.slice(0, limitParam),
            });
        };

        return createResponse(200, {
            response_code: 0,
            results: data.slice(0, 5),
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return createResponse(500, {
                message: "Something went wrong...",
                error: error.message,
            });
        };
        
        return createResponse(500, {
            message: "Something went wrong...",
            error: 'Unknown error occurred',
        });
    }
}
