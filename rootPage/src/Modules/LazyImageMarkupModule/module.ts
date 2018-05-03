//import { GlueModule } from "../../../../../module-glue-ts/src";
import { GlueModule } from "module-glue-ts";

import template from './template.hbs';
import styles from './styles.scss';

export default class LazyImageMarkupModule extends GlueModule {
    
    name = 'LazyImageMarkupModule';
    
    async render() : Promise<string> {
        console.log( 'styles', styles );
        await super.render();
        return template( { styles } );
    }
}