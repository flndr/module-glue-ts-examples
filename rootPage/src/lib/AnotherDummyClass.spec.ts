import { AnotherDummyClass } from './AnotherDummyClass';

describe( 'AnotherDummyClass Spec', () => {
    
    it( 'should be defined', () => {
        expect( typeof AnotherDummyClass ).toBe( 'function' );
    } );
    
    it( 'should summarize', () => {
        const d = new AnotherDummyClass();
        expect( d.summarize( 1, 2 ) ).toBe( 3 );
    } );
    
} );