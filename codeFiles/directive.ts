import {Directive, Input} from 'angular2/core';
import {TemplateRef, ViewContainerRef} from 'angular2/core';

@Directive({ selector: '[~]' })
export class ~ {
    constructor(
        private _templateRef: TemplateRef,
        private _viewContainer: ViewContainerRef
    ) {}

}