export interface Product{
    productId: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}