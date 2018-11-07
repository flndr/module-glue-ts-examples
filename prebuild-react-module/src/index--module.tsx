import { GlueModule } from 'module-glue-ts';
import { startApp } from './startApp';

export default class PrebuildReactModule extends GlueModule {
    public name = 'PrebuildReactModule';
    
    public async render() {
        return '<div data-js-element="root"></div>';
    }
    
    public async afterMount() {
        startApp( this.element.querySelector( '[data-js-element="root"]' ) as HTMLElement );
    }
}