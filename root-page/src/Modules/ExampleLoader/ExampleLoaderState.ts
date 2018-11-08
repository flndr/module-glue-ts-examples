import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export class ExampleLoaderState {
    
    @persist( 'list' ) @observable examples : string[] = [];
    
    @action setExamples( ex : string[] ) {
        this.examples = ex;
    }
}

const exampleLoaderState = new ExampleLoaderState();

export default exampleLoaderState;
