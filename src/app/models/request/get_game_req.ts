export interface GetGameRequest {
    name: string;
    price: string;
    genre: string;
    description: string;
    image?: string; // เพิ่มฟิลด์ image
}