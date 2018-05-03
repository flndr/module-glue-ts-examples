declare var __DEV__ : boolean;

declare module '*.scss' {
    const content : any;
    export default content;
}

declare module '*.css' {
    const content : any;
    export default content;
}

declare module '*.svg' {
    const content : any;
    export default content;
}

declare module '*.hbs' {
    const content : ( templateVars : any ) => string;
    export default content;
}