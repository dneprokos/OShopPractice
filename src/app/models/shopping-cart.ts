import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: { [key: string]: ShoppingCartItem };

    get totalProductsCount(){
        let count = 0;
        for(let productId in this.items){
            count +=this.items[productId].quantity;
        }
        return count;
    }
}