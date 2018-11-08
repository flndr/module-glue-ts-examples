import { GlueModule, load } from 'module-glue-ts';
import styles from './styles.css';

declare var $ : any; // dont want to deal with types here, just a dumb example

export default class JqueryModule extends GlueModule {
    name = 'JqueryModule';
    
    async beforeMount() {
        await load( 'https://code.jquery.com/jquery-3.3.1.slim.min.js' );
        await load( [
            'https://fengyuanchen.github.io/datepicker/css/datepicker.css',
            'https://fengyuanchen.github.io/datepicker/js/datepicker.js'
        ] );
    }
    
    async render() {
        return `
            <div>
                This module loaded jQuery and a datepicker from external sources.
                <span data-glue="value">You can use it now:</span>
            <div>
            <input data-glue="datepicker" placeholder="Select date" />
            <button data-glue="button" class="${styles.button}">Set</button>
        `;
    }
    
    async afterMount() {
        
        const $el         = $( this.element );
        const $datepicker = $el.find( '[data-glue="datepicker"]' );
        const $btn        = $el.find( '[data-glue="button"]' );
        const $value      = $el.find( '[data-glue="value"]' );
        
        $datepicker.datepicker();
        
        $btn.on( 'click', ( e : Event ) => {
            e.preventDefault();
            const value = $datepicker.val();
            $value.text( value ? `You picked "${value}".` : 'Please set a date.' );
        } );
        
    }
}