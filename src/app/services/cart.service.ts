import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem = this.cartItems.find(
      (item) => item.id === cartItem.id
    );
    // check if we found it
    alreadyExistInCart = existingCartItem != undefined;

    if (alreadyExistInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(cartItem!);
    }

    // computre cart total price and total quantity
    this.computeCartTotals();
  }

  removeToCart(cartItem: CartItem) {
    // get the index of the item in the array
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === cartItem.id
    );
    // if found it remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  decrementQuantity(cartItem: CartItem): void {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.removeToCart(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  computeCartTotals(): void {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem?.quantity * currentCartItem?.unitPrice;
      totalQuantityValue += currentCartItem?.quantity;
    }

    // pushing the new values so that all the subcribers will receive the new datas

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  private logCartData(totalPrice: number, totalQuantity: number) {
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem?.quantity * tempCartItem?.unitPrice;
      console.log(
        `name: ${tempCartItem?.name}, quantity: ${tempCartItem?.quantity}, unitPrice: ${tempCartItem?.unitPrice}, subTotalPrice: ${subTotalPrice}`
      );
    }
    console.log(
      `TotalPrice: ${totalPrice.toFixed(2)}, totalQuantity: ${totalQuantity}`
    );
    console.log('------');
  }
}
