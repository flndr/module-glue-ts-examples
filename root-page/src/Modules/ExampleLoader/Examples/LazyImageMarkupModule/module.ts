import { GlueModule } from 'module-glue-ts';

import template from './template.hbs';
import styles from './styles.css';

export default class LazyImageMarkupModule extends GlueModule {
    
    name = 'LazyImageMarkupModule';
    
    async render() : Promise<string> {
        const bg = await import( './image.jpg' );
        return template( { styles, bg : bg.default } );
    }
}