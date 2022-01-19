import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppConfigComponent } from './app.config.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import {AppMenuComponent} from './app.menu.component';
//import { AppMenuitemComponent } from './shared/app.menuitem.component';
//import {AppBreadcrumbComponent} from './app.breadcrumb.component';
//import {AppTopBarComponent} from './shared/toolbar/app.topbar.component';
//import {AppFooterComponent} from './shared/footer/app.footer.component';
import {DashboardComponent} from './demo/view/dashboard.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';


//ngx qrmat-form-field
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

import {BreadcrumbService} from './services/breadcrumb.service';
import {MenuService} from './services/app.menu.service';

// Modulos
import { SharedModule } from './shared/shared.module';

import { FormularioFucComponent } from './pages/unidad-solicitante/formulario-fuc/formulario-fuc.component';
import { FormTdrVisualizarComponent } from './pages/unidad-solicitante/form-tdr-visualizar/form-tdr-visualizar.component';
import { FormTdrListadoComponent } from './pages/unidad-solicitante/form-tdr-listado/form-tdr-listado.component';
import { FormTdrCrearComponent } from './pages/unidad-solicitante/form-tdr-crear/form-tdr.component';

// plugin para fotos
//import { FileUploadModule } from 'ng2-file-upload';

// Ngx-Pagination
import {NgxPaginationModule} from 'ngx-pagination';
import { FormTdrEditarComponent } from './pages/unidad-solicitante/form-tdr-editar/form-tdr-editar.component';
import { FormFucVisualizarComponent } from './pages/unidad-solicitante/form-fuc-visualizar/form-fuc-visualizar.component';
import { FormFucListadoComponent } from './pages/planificacion/form-fuc-listado/form-fuc-listado.component';
import { FormFucRegistrarComponent } from './pages/planificacion/form-poa-registrar/form-fuc-registrar.component';
import { FormPoaVisualizacionComponent } from './pages/planificacion/form-poa-visualizacion/form-poa-visualizacion.component';
import { PoaListadoComponent } from './pages/usa/poa-listado/poa-listado.component';
import { FormFucListadoRrhhComponent } from './pages/rrhh/form-fuc-listado-rrhh/form-fuc-listado-rrhh.component';
import { FormFucEditarRrhhComponent } from './pages/rrhh/form-fuc-editar-rrhh/form-fuc-editar-rrhh.component';
import { GenerarNotaAdjudicacionComponent } from './pages/usa/generar-nota-adjudicacion/generar-nota-adjudicacion.component';
import { RevisionDocumentosComponent } from './pages/usa/revision-documentos/revision-documentos.component';
import { FormularioPoaComponent } from './pages/planificacion/formulario-poa/formulario-poa.component';
import { FormPoaEditarComponent } from './pages/planificacion/form-poa-editar/form-poa-editar.component';
import { FormTdrCopiarComponent } from './pages/unidad-solicitante/form-tdr-copiar/form-tdr-copiar.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { UsuariosListadoComponent } from './pages/administrador/usuarios-listado/usuarios-listado.component';
import { Usuarios2Component } from './pages/administrador/usuarios-crear/usuarios2.component';
import { FormPoaExperienciaComponent } from './pages/planificacion/form-poa-experiencia/form-poa-experiencia.component';
import { UsuariosEditarComponent } from './pages/administrador/usuarios-editar/usuarios-editar.component';
import { CuadroEqListadoComponent } from './pages/administrador/cuadro-eq-listado/cuadro-eq-listado.component';
import { CuadroEqEditarComponent } from './pages/administrador/cuadro-eq-editar/cuadro-eq-editar.component';
import { UsuariosVisualizarComponent } from './pages/administrador/usuarios-visualizar/usuarios-visualizar.component';
import { CuadroEqCrearComponent } from './pages/administrador/cuadro-eq-crear/cuadro-eq-crear.component';
import { ContratosListadoComponent } from './pages/asesoria-legal/contratos-listado/contratos-listado.component';
import { GenerarContratoComponent } from './pages/asesoria-legal/generar-contrato/generar-contrato.component';
import { GenerarInformeLegalComponent } from './pages/asesoria-legal/generar-informe-legal/generar-informe-legal.component';
import { VisualizarInformeLegalComponent } from './pages/asesoria-legal/visualizar-informe-legal/visualizar-informe-legal.component';
import { VerificadorComponent } from './pages/asesoria-legal/verificador-qr/verificador.component';
import { EditarInformeLegalComponent } from './pages/asesoria-legal/editar-informe-legal/editar-informe-legal.component';
import { CredencialesListadoComponent } from './pages/administrador/credenciales-listado/credenciales-listado.component';
import { NotaEditarComponent } from './pages/usa/nota-editar/nota-editar.component';
import { EditarPostulanteComponent } from './pages/asesoria-legal/editar-postulante/editar-postulante.component';
import { CredencialesGenerarComponent } from './pages/administrador/credenciales-generar/credenciales-generar.component';
import { FormTdrPrelistadoComponent } from './pages/unidad-solicitante/form-tdr-prelistado/form-tdr-prelistado.component';
import { FormTdrCopiarPreComponent } from './pages/unidad-solicitante/form-tdr-copiar-pre/form-tdr-copiar-pre.component';
import { FormTdrEditarPreComponent } from './pages/unidad-solicitante/form-tdr-editar-pre/form-tdr-editar-pre.component';
import { CredencialesSeleccionadosComponent } from './pages/administrador/credenciales-seleccionados/credenciales-seleccionados.component';
import { SafePipe } from './pipe/safe.pipe';
import { DireccionesListadoComponent } from './pages/administrador/direcciones-listado/direcciones-listado.component';
import { DireccionesCrearComponent } from './pages/administrador/direcciones-crear/direcciones-crear.component';
import { DynamicDialogModule } from 'primeng';

import { Modal } from './pages/administrador/direcciones-listado/modal.component';
import { Visualizar } from './pages/administrador/direcciones-listado/visualizar.component';
import { Modificar } from './pages/administrador/direcciones-listado/modificar.component';




@NgModule({
    imports: [
        DynamicDialogModule,
        NgxQRCodeModule,
        PDFExportModule,
        MatTabsModule,
        BrowserModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule ,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        SharedModule,
        
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        //AppMenuitemComponent,
            AppConfigComponent,
        //AppBreadcrumbComponent,
        //AppTopBarComponent,
        //AppFooterComponent,
        Modal,
        Modificar,
        Visualizar,
        DashboardComponent,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        UtilsDemoComponent,
        DocumentationComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        FormularioFucComponent,
        FormTdrVisualizarComponent,
        FormTdrListadoComponent,   
        FormTdrCrearComponent, 
        FormTdrEditarComponent, 
        FormFucVisualizarComponent, 
        FormFucListadoComponent,
         FormFucRegistrarComponent, 
         FormPoaVisualizacionComponent, 
         PoaListadoComponent,
        FormFucListadoRrhhComponent, 
        FormFucEditarRrhhComponent, 
        GenerarNotaAdjudicacionComponent, 
        RevisionDocumentosComponent, 
        FormularioPoaComponent, 
        FormPoaEditarComponent,
        FormTdrCopiarComponent, 
        UsuariosListadoComponent, 
        Usuarios2Component, 
        FormPoaExperienciaComponent, 
        UsuariosEditarComponent, 
        CuadroEqListadoComponent, 
        CuadroEqEditarComponent, 
        UsuariosVisualizarComponent, 
        CuadroEqCrearComponent, 
        ContratosListadoComponent, 
        GenerarContratoComponent, 
        GenerarInformeLegalComponent, 
        VisualizarInformeLegalComponent, 
        VerificadorComponent, 
        EditarInformeLegalComponent, 
        CredencialesListadoComponent, 
        NotaEditarComponent, 
        EditarPostulanteComponent, 
        CredencialesGenerarComponent, 
        FormTdrPrelistadoComponent,
        FormTdrCopiarPreComponent,
        FormTdrEditarPreComponent,
        CredencialesSeleccionadosComponent,
        SafePipe,
        DireccionesListadoComponent,
        DireccionesCrearComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService, CountryService, EventService, NodeService, BreadcrumbService, MenuService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
