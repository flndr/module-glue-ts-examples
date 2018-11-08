const lazyModules : { [ key : string ] : () => Promise<any> } = {
    //'PrebuildReactModule'   : () => import('../../prebuild-react-module/build/static/js/main.05e03af1'),
    'LazyImageMarkupModule' : () => import('./Modules/LazyImageMarkupModule/module'),
    'HelloWorldModule'      : () => import('./Modules/HelloWorldModule/module'),
    'JqueryModule'          : () => import('./Modules/JqueryModule/module')
};

export default lazyModules;