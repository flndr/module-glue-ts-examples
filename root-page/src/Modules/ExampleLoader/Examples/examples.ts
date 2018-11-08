const examples : { [ key : string ] : () => Promise<any> } = {
    'LazyImageMarkupModule' : () => import('./LazyImageMarkupModule/module'),
    'HelloWorldModule'      : () => import('./HelloWorldModule/module'),
    'JqueryModule'          : () => import('./JqueryModule/module')
};

export default examples;