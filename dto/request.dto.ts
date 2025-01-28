//DTO para procesar la request a la API

export class RequestDto {
    passengers: { age: string; birthdate: string }[];
    IATAcode: string;
    startDate: string;
    endDate: string;
}  