import { GlueModule } from 'module-glue-ts';

import template from './ExampleLoader.hbs';
import styles from './ExampleLoader.css';
import lazyModules from '../../lazyModules';

export default class ExampleLoader extends GlueModule {
    
    name = 'ModuleLoaderModule';
    
    exampleSelect : HTMLSelectElement;
    exampleAdd : HTMLButtonElement;
    examples : HTMLDivElement;
    preloader : HTMLDivElement;
    
    constructor() {
        super();
        this.removeExample     = this.removeExample.bind( this );
        this.onExampleAddClick = this.onExampleAddClick.bind( this );
    }
    
    updateExamples() {
        const examples = Array.from( this.element.querySelectorAll( '.' + styles.example ) );
        console.log( examples );
    }
    
    async render() : Promise<string> {
        return template( {
            styles,
            examples : Object.keys( lazyModules )
        } );
    }
    
    async afterMount() {
        this.preloader     = this.element.querySelector( '[data-js-element="preloader"]' );
        this.examples      = this.element.querySelector( '[data-js-element="examples"]' );
        this.exampleSelect = this.element.querySelector( '[data-js-element="exampleSelect"]' );
        this.exampleAdd    = this.element.querySelector( '[data-js-element="exampleAdd"]' );
        
        this.exampleAdd.addEventListener( 'click', this.onExampleAddClick );
        
        this.hideLoader();
    }
    
    async onExampleAddClick( e : Event ) {
        e.preventDefault();
        
        this.showLoader();
        
        this.examples.insertAdjacentHTML( 'beforeend', `
            <div class="${styles.example}">
                <div class="${styles.exampleContainer}" ${this.config.ATTR_MODULE_NAME}="${this.exampleSelect.value}"></div>
                <div class="${styles.exampleToolbar}">
                    <span>Example: ${this.config.ATTR_MODULE_NAME}</span>
                    <a href="#" class="${styles.hide}">unload</a>
                </div>
            </div>` );
        
        Array.from( this.examples.querySelectorAll( 'a.' + styles.hide ) ).forEach( a => {
            a.removeEventListener( 'click', this.removeExample );
            a.addEventListener( 'click', this.removeExample );
        } );
        
        await this.glue.start( this.element );
        
        this.hideLoader();
    }
    
    async removeExample( e : Event ) {
        e.preventDefault();
        const a       = e.currentTarget as Element;
        const example = a.parentElement.parentElement;
        await this.glue.stop( example );
        example.remove();
    }
    
    showLoader() {
        this.preloader.classList.remove( styles.off );
    }
    
    hideLoader() {
        this.preloader.classList.add( styles.off );
    }
    
}