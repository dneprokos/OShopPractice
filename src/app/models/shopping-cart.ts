import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        for(let productId in items){
            let item = items[productId];
        }           
    }   

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.items)
            count +=this.items[productId].quantity;
        return count;
    }
}