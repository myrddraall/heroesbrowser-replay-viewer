import { ComponentFactoryResolver, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { SectionNotSupportedComponent } from '../components/section-not-supported/section-not-supported.component';
import { SectionLoadingComponent } from '../components/section-loading/section-loading.component';

export abstract class AbstractSectionComponent implements AfterViewInit {

    @ViewChild('statusRef', { read: ViewContainerRef })
    private statusRefContainer: ViewContainerRef;
    private notSupportedRef: ComponentRef<SectionNotSupportedComponent>;
    private loadingRef: ComponentRef<SectionLoadingComponent>;


    public constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        protected changeDetectorRef: ChangeDetectorRef
    ) {

    }

    public ngAfterViewInit() {
        const notSupportedFactory = this.componentFactoryResolver.resolveComponentFactory(SectionNotSupportedComponent);
        this.notSupportedRef = this.statusRefContainer.createComponent(notSupportedFactory);

        const loadingFactory = this.componentFactoryResolver.resolveComponentFactory(SectionLoadingComponent);
        this.loadingRef = this.statusRefContainer.createComponent(loadingFactory);
    }

    protected setNotSupportedMessage(message: string) {
        if (this.notSupportedRef.instance.message !== message) {
            this.notSupportedRef.instance.message = message;
            this.changeDetectorRef.markForCheck();
        }
    }

    protected clearNotSupported(): void {
        this.setNotSupportedMessage(undefined);
    }

    protected setLoadingMessage(message: string) {
        if (this.loadingRef.instance.message !== message) {
            this.loadingRef.instance.message = message;
            this.changeDetectorRef.markForCheck();
        }
    }

    protected clearLoading(): void {
        this.setLoadingMessage(undefined);
    }
}
