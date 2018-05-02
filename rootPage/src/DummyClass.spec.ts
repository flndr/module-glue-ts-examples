import { DummyClass } from './DummyClass';

describe( 'DummyClass Spec', () => {
    
    it( 'should be defined', () => {
        expect( typeof DummyClass ).toBe( 'function' );
    } );
    
    it( 'should say hello', () => {
        const d = new DummyClass();
        expect( d.sayHello() ).toBe( 'hello' );
    } );
    
    it( 'should say bye', () => {
        const d = new DummyClass();
        expect( d.sayBye() ).toBe( 'good bye' );
    } );
    
} );