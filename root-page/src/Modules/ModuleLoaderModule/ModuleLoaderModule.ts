import { GlueModule } from "module-glue-ts";

import template from './ModuleLoaderModule.hbs';
import styles from './ModuleLoaderModule.css';

export default class ModuleLoaderModule extends GlueModule {
    
    name = 'ModuleLoaderModule';
    
    async render() : Promise<string> {
        return template( { styles } );
    }
}