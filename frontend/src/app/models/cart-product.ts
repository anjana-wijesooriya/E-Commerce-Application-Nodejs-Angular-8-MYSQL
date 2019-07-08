import { Attribute } from './attribute';

export class CartProduct {
    ProductId: number;
    CategoryId: number;
    DepartmentId: number;
    DepartmentName: string;
    CategoryName: string;
    Name: string;
    Description: string;
    PrimaryImage: string;
    SecondaryImage: string;
    Thumbnail: string;
    Display: number;
    Price: number;
    DescountedPrice: number;
    ProductCount: number;
    Color: Attribute[];
    Size: Attribute[];
    Quantity: number;
    SizeId: number;
    ColorId: number;
}
