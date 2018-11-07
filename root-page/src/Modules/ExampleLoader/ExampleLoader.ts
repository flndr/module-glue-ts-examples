import { GlueModule } from 'module-glue-ts';

import moduleTemplate from './ExampleLoader.hbs';
import exampleTemplate from './ExampleContainer.hbs';
import styles from './ExampleLoader.css';
import lazyModules from '../../lazyModules';


export default class ExampleLoader extends GlueModule {
    
    name = 'ModuleLoaderModule';
    
    exampleSelect : HTMLSelectElement;
    exampleAdd : HTMLButtonElement;
    exampleNew : HTMLDivElement;
    preloader : HTMLDivElement;
    
    async render() : Promise<string> {
        return moduleTemplate( {
            styles,
            examples : Object.keys( lazyModules )
        } );
    }
    
    async afterMount() {
        this.preloader     = this.element.querySelector( '[data-js-element="preloader"]' );
        this.exampleNew    = this.element.querySelector( '[data-js-element="exampleNew"]' );
        this.exampleSelect = this.element.querySelector( '[data-js-element="exampleSelect"]' );
        this.exampleAdd    = this.element.querySelector( '[data-js-element="exampleAdd"]' );
    
        this.exampleAdd.addEventListener( 'click', this.addNewExample.bind( this ) );
        
        this.hideLoader();
    }
    
    async addNewExample( e : Event ) {
        e.preventDefault();
        
        this.showLoader();
        
        const newExample = this.addNewExampleDomNode();
        
        await this.glue.start( newExample );
        
        const removeButton = newExample.querySelector( '[data-js-element="removeButton"]' );
        const container    = newExample.querySelector( '[data-js-element="exampleContainer"]' );
        const moduleId     = newExample.querySelector( '[data-js-element="moduleId"]' );
        moduleId.innerHTML = container.getAttribute( this.glue.CONFIG.ATTR_MODULE_ID );
        removeButton.addEventListener( 'click', this.removeExample.bind( this, newExample ) );
        
        this.hideLoader();
    }
    
    async removeExample( example : Element, e : Event ) {
        e.preventDefault();
        await this.glue.stop( example );
        example.remove();
    }
    
    private showLoader() {
        this.preloader.classList.remove( styles.off );
    }
    
    private hideLoader() {
        this.preloader.classList.add( styles.off );
    }
    
    private addNewExampleDomNode() {
        const newExample = document.createElement( "div" );
        newExample.classList.add( styles.exampleWrapper );
        
        newExample.insertAdjacentHTML( 'beforeend', exampleTemplate( {
            moduleName     : this.exampleSelect.value,
            moduleNameAttr : this.config.ATTR_MODULE_NAME,
            styles
        } ) );
        
        return this.exampleNew.parentNode.insertBefore( newExample, this.exampleNew );
    }
    
}