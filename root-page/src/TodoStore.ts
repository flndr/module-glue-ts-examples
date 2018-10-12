import { observable } from 'mobx';

class MyStore {
    @observable data = 'foo'
}

export const myStore = new MyStore();
