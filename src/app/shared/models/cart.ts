import { Product } from './product';

export interface Cart {
    dateCreated: number;
    items: [ 
        {
            productId: {
                product: Product;
                quantity: Number;
            },
        }
    ]
}