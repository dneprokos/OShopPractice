import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    itemsArray: ShoppingCartItem[] = []
    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        for(let productId in items){
            let item = items[productId];
            this.itemsArray.push(new ShoppingCartItem(item.product, item.quantity));
        }           
    }
    
    get totalPrice(){
        let sum = 0;
        for(let productId in this.itemsArray)
            sum += this.itemsArray[productId].totalPrice;
        return sum;
    }

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.items)
            count +=this.items[productId].quantity;
        return count;
    }
}