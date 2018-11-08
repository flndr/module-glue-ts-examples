import { create } from 'mobx-persist';
import {GlueModule } from 'module-glue-ts';

import moduleTemplate from './ExampleLoader.hbs';
import exampleTemplate from './ExampleContainer.hbs';
import styles from './ExampleLoader.css';
import examples from './Examples/examples';
import exampleLoaderState from './ExampleLoaderState';

export default class ExampleLoader extends GlueModule {
    
    name = 'ExampleLoader';
    
    exampleSelect : HTMLSelectElement;
    exampleAdd : HTMLButtonElement;
    exampleNew : HTMLDivElement;
    preloader : HTMLDivElement;
    
    runningModules : { [ id : string ] : string } = {};
    
    async render() : Promise<string> {
        return moduleTemplate( {
            styles,
            examples : Object.keys( examples )
        } );
    }
    
    async beforeMount() {
        await create( {} )( 'exampleLoaderState', exampleLoaderState );
    }
    
    async afterMount() {
        this.preloader     = this.element.querySelector( '[data-js-element="preloader"]' );
        this.exampleNew    = this.element.querySelector( '[data-js-element="exampleNew"]' );
        this.exampleSelect = this.element.querySelector( '[data-js-element="exampleSelect"]' );
        this.exampleAdd    = this.element.querySelector( '[data-js-element="exampleAdd"]' );
        
        this.exampleAdd.addEventListener( 'click', this.handleAddExample.bind( this ) );
        
        exampleLoaderState.examples.forEach( moduleName => this.startModule( moduleName ) );
        
        
        this.hideLoader();
    }
    
    async handleAddExample( e : Event ) {
        e.preventDefault();
        this.showLoader();
        await this.startModule( this.exampleSelect.value );
        this.hideLoader();
    }
    
    async startModule( moduleName : string ) {
        const newExample = this.addNewExampleDomNode( moduleName );
        
        
        await this.glue.start( newExample );
        
        const removeButton = newExample.querySelector( '[data-js-element="removeButton"]' );
        const container    = newExample.querySelector( '[data-js-element="exampleContainer"]' );
        const moduleId     = newExample.querySelector( '[data-js-element="moduleId"]' );
        
        const id = container.getAttribute( this.glue.CONFIG.ATTR_MODULE_ID );
        
        moduleId.innerHTML        = id;
        this.runningModules[ id ] = moduleName;
        
        removeButton.addEventListener( 'click', this.stopModule.bind( this, newExample, id ) );
        
        this.updateState();
    }
    
    async stopModule( example : Element, id : string, e : Event ) {
        e.preventDefault();
        await this.glue.stop( example );
        delete this.runningModules[ id ];
        example.remove();
        this.updateState();
    }
    
    private showLoader() {
        this.preloader.classList.remove( styles.off );
    }
    
    private hideLoader() {
        this.preloader.classList.add( styles.off );
    }
    
    private addNewExampleDomNode( moduleName : string ) {
        const newExample = document.createElement( "div" );
        newExample.classList.add( styles.exampleWrapper );
        
        newExample.insertAdjacentHTML( 'beforeend', exampleTemplate( {
            moduleNameAttr : this.config.ATTR_MODULE_NAME,
            moduleName, styles
        } ) );
        
        return this.exampleNew.parentNode.insertBefore( newExample, this.exampleNew );
    }
    
    private updateState() {
        exampleLoaderState.setExamples( Object.values( this.runningModules ) );
    }
    
}