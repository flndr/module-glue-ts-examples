import { router } from './routes';
import { SubscribeState } from "router5/core/observable";


import { Glue } from 'module-glue-ts';
const g = new Glue();
console.log( 'g', g );

sayHello( document.getElementById( 'app' ) );

router.subscribe( ( state : SubscribeState ) => {
    console.log( 'router.subscribe', state );
} );

export async function sayHello( el : HTMLElement | null ) {
    
    await wait( 500 ); // just to test async jasmine...
    
    const loadedFile = await import( './DummyClass' ); // and we test dynamic import !
    
    console.log( 'loadedFile', typeof loadedFile, loadedFile instanceof Promise );
    
    const dummyInstance = new loadedFile.DummyClass();
    
    console.log( 'can you debug this line in the original source?', dummyInstance.sayHello() );
    
    if ( el ) {
        el.innerText = dummyInstance.sayHello();
    }
    
}

function wait( time : number ) : Promise<void> {
    return new Promise( resolve => {
        setTimeout( () => {
            // could be written shorter, but this way we can add a breakpoint here
            console.log( `... waited ${time}ms` );
            resolve();
        }, time );
    } );
}