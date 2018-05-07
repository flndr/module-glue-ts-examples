//import { Glue } from "../../../module-glue-ts/src";
import { Glue } from "module-glue-ts";

const glue = new Glue();

const LazyImageMarkupModule = () => import('./Modules/LazyImageMarkupModule/module');

glue.registerLazyModule( 'LazyImageMarkupModule', LazyImageMarkupModule );

export {
    glue
};