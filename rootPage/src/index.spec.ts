import { sayHello } from '../src/index';

describe( "index.ts spec", function () {
    
    beforeEach( () => {
        document.body.innerHTML = '<div id="app"></div>';
    } );
    
    afterEach( () => {
        document.body.innerHTML = '';
    } );
    
    it( "should print hello to an element", async function () {
        const el = document.getElementById( 'app' ) as HTMLElement;
        await sayHello( el );
        expect( el.innerText ).toEqual( 'hello' );
    } );
    
} );