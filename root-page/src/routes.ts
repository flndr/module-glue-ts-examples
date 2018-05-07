import createRouter, { DoneFn } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';
import { Route, Router, State } from 'router5/create-router';
import { SubscribeState } from 'router5/core/observable';

class Routes {
    public HOME : Route     = { name : 'home', path : '/' };
    public SHOP : Route     = { name : 'shop', path : '/shop' };
    public CART : Route     = { name : 'cart', path : '/cart' };
    public CHECKOUT : Route = { name : 'checkout', path : '/checkout' };
}

const routes = new Routes();

const router : Router = createRouter( Object.values( routes ) );
router.usePlugin( browserPlugin( { useHash : true } ) );
router.usePlugin( listenersPlugin() );

function start() {
    router.start( routes.HOME.name );
}

function navigate( r : Route, params ? : any ) {
    router.navigate( r.name, params );
}

// what is {} in function params? --> https://www.triplet.fi/blog/typescript-getting-rid-of-error-x-is-declared-but-never-used/
const testMiddleware = () => ( toState : State, {}, done : DoneFn ) => {
    if ( toState.name === routes.SHOP.name ) {
        console.log( 'uh, this is shop route. we have to load some heavy stuff...' );
        setTimeout( function () {
            console.log( '... done loading' );
            done();
        }, 5000 );
    } else {
        done();
    }
};

router.useMiddleware( testMiddleware );

router.subscribe( ( state : SubscribeState ) => {
    console.log( 'router.subscribe', state );
} );

export {
    router,
    routes,
    navigate,
    start
};