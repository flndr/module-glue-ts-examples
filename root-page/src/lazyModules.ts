const lazyModules : { [ key : string ] : () => Promise<any> } = {
    'LazyImageMarkupModule' : () => import('./Modules/LazyImageMarkupModule/module')
};

export default lazyModules;