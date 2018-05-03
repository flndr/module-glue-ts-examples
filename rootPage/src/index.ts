import { start } from './routes';
import { glue } from './modules';
//import { SubscribeState } from "router5/core/observable";
import "./index.scss";

start();

//sayHello( document.getElementById( 'app' ) );

setTimeout( () => glue.start() , 1000);

//glue.start();
//
//export async function sayHello( el : HTMLElement | null ) {
//
//    await wait( 500 ); // just to test async jasmine...
//
//    const loadedFile = await import( /* webpackChunkName: "LazyImageMarkupModule" */ './Modules/LazyImageMarkupModule/module' ); // and we test dynamic import !
//
//    console.log( 'loadedFile', typeof loadedFile, loadedFile instanceof Promise );
//
//    const dummyInstance = new loadedFile.default();
//
//    const markup = await dummyInstance.render();
//
//    console.log( 'can you debug this line in the original source?', markup );
//
//    if ( el ) {
//        el.innerText = markup;
//    }
//
//}
//
//function wait( time : number ) : Promise<void> {
//    return new Promise( resolve => {
//        setTimeout( () => {
//            // could be written shorter, but this way we can add a breakpoint here
//            console.log( `... waited ${time}ms` );
//            resolve();
//        }, time );
//    } );
//}