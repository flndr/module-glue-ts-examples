
import ExampleLoader from './Modules/ExampleLoader/ExampleLoader';
import { Glue } from 'module-glue-ts';

const glue = new Glue();

glue.registerModule( 'ExampleLoader', ExampleLoader );

export default glue;
