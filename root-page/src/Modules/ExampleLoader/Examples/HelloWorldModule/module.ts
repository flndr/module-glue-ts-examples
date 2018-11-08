import { GlueModule } from "module-glue-ts";

export default class HelloWorldModule extends GlueModule {
    
    name = 'HelloWorldModule';
    
    async render() {
        return '<h4>Hello. World.</h4>';
    }
}