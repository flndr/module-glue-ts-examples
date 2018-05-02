export class Product {
    private _id : string;
    private _name : string;
    private _price : number;
    private _stock : number;
    
    get isInStock() : boolean {
        return this._stock > 0;
    }
    
    get id() : string {
        return this._id;
    }
    
    set id( value : string ) {
        this._id = value;
    }
    
    get name() : string {
        return this._name;
    }
    
    set name( value : string ) {
        this._name = value;
    }
    
    get price() : number {
        return this._price;
    }
    
    set price( value : number ) {
        this._price = value;
    }
    
    get stock() : number {
        return this._stock;
    }
    
    set stock( value : number ) {
        this._stock = value;
    }
}