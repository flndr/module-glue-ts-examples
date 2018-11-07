import { GlueModule } from "module-glue-ts";

export default class HelloWorldModule extends GlueModule {
    
    name = 'HelloWorldModule';
    
    async render() {
        return 'Hello. World.';
    }
}