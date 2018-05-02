import { classToClass } from 'class-transformer';
import clone from 'clone';

import { Product } from './Product';

export interface CartItem {
    count : number;
    product : Product;
}

export class Cart {
    
    private _items : { [ productId : string ] : CartItem };
    
    get itemsById() {
        return clone( this._items );
    }
    
    get items() : CartItem[] {
        return Object.keys( this._items ).map( ( key : string ) => clone( this._items[ key ] ) );
    }
    
    get totalPrice() {
        return this.items.reduce( ( total, item ) =>
            total + (item.count * item.product.price),
            0
        );
    }
    
    public addItem( product : Product ) : void {
        if ( this._items.hasOwnProperty( product.id ) ) {
            this._items[ product.id ].count++;
        } else {
            this._items[ product.id ] = { count : 0, product : classToClass( product ) }
        }
    }
    
    public removeItem( productId : string ) : void {
        if ( !this._items.hasOwnProperty( productId ) ) {
            throw new Error( CartErrors.NOT_IN_CART );
        }
        this._items[ productId ].count--;
        if ( this._items[ productId ].count == 0 ) {
            delete this._items[ productId ];
        }
    }
    
}

export class CartErrors {
    public static NOT_IN_CART = "Item not inside cart.";
}