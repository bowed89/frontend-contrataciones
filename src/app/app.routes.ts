import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './demo/view/dashboard.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';

import { AuthGuard } from './guards/auth.guard';
import { FormularioFucComponent } from './pages/unidad-solicitante/formulario-fuc/formulario-fuc.component';
import { FormTdrVisualizarComponent } from './pages/unidad-solicitante/form-tdr-visualizar/form-tdr-visualizar.component';
import { FormTdrListadoComponent } from './pages/unidad-solicitante/form-tdr-listado/form-tdr-listado.component';
import { FormTdrCrearComponent } from './pages/unidad-solicitante/form-tdr-crear/form-tdr.component';
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
import { FormTdrPrelistadoComponent } from './pages/unidad-solicitante/form-tdr-prelistado/form-tdr-prelistado.component';
import { FormTdrCopiarPreComponent } from './pages/unidad-solicitante/form-tdr-copiar-pre/form-tdr-copiar-pre.component';
import { FormTdrEditarPreComponent } from './pages/unidad-solicitante/form-tdr-editar-pre/form-tdr-editar-pre.component';
import { CredencialesSeleccionadosComponent } from './pages/administrador/credenciales-seleccionados/credenciales-seleccionados.component';
import { CredencialesGenerarComponent } from './pages/administrador/credenciales-generar/credenciales-generar.component';
import { DireccionesListadoComponent } from './pages/administrador/direcciones-listado/direcciones-listado.component';
import { DireccionesCrearComponent } from './pages/administrador/direcciones-crear/direcciones-crear.component';


export const routes: Routes = [
    { 
        path: '', component: AppMainComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'components/sample', component: SampleDemoComponent },
            { path: 'components/forms', component: FormsDemoComponent },
            { path: 'components/data', component: DataDemoComponent },
            { path: 'components/panels', component: PanelsDemoComponent },
            { path: 'components/overlays', component: OverlaysDemoComponent },
            { path: 'components/menus', component: MenusDemoComponent },
            { path: 'components/messages', component: MessagesDemoComponent },
            { path: 'components/misc', component: MiscDemoComponent },
            { path: 'pages/empty', component: EmptyDemoComponent },
            { path: 'components/charts', component: ChartsDemoComponent },
            { path: 'components/file', component: FileDemoComponent },
            { path: 'components/file', component: FileDemoComponent },
            { path: 'utils', component: UtilsDemoComponent },
            { path: 'documentation', component: DocumentationComponent },   
            { path: 'formulario-fuc/:id', component: FormularioFucComponent },
            { path: 'formulario-poa/:id', component: FormularioPoaComponent },   
            { path: 'formulario-listado', component: FormTdrListadoComponent },   
            { path: 'form-tdr-crear', component: FormTdrCrearComponent },  
            { path: 'tdr-visualizar/:id', component: FormTdrVisualizarComponent },  
            { path: 'form-tdr-editar/:id', component: FormTdrEditarComponent },  
            { path: 'form-poa-editar/:id', component: FormPoaEditarComponent }, 
            { path: 'form-poa-experiencia/:id', component: FormPoaExperienciaComponent }, 
            { path: 'form-tdr-copiar/:id', component: FormTdrCopiarComponent },  
            { path: 'fuc-visualizar/:id/:verificar', component: FormFucVisualizarComponent },  //////
            { path: 'fuc-listado', component: FormFucListadoComponent },  
            { path: 'fuc-listado-rrhh', component: FormFucListadoRrhhComponent },  
            { path: 'poa-registrar/:id', component: FormFucRegistrarComponent },  
            { path: 'poa-visualizar/:id', component: FormPoaVisualizacionComponent },  
            { path: 'poa-listado', component: PoaListadoComponent },  
            { path: 'form-fuc-editar/:id', component: FormFucEditarRrhhComponent },  
            { path: 'nota-adjudicacion/:id', component: GenerarNotaAdjudicacionComponent },  
            { path: 'revision-postulante/:id', component: RevisionDocumentosComponent },  
            { path: 'usuario-agregar', component: Usuarios2Component }, 
            { path: 'usuario-edit/:id/:id2', component: UsuariosEditarComponent },  
            { path: 'usuarios/listado', component: UsuariosListadoComponent }, 
            { path: 'usuarios-visualizar/:id', component: UsuariosVisualizarComponent }, 
            { path: 'usuarios/cuadro-listado', component: CuadroEqListadoComponent },
            { path: 'usuarios/cuadro-editar/:id', component: CuadroEqEditarComponent },
            { path: 'usuarios/cuadro-crear', component: CuadroEqCrearComponent }, 
            { path: 'asesoria-listado', component: ContratosListadoComponent }, 
            { path: 'asesoria-generar-contrato/:id', component: GenerarContratoComponent },   
            { path: 'asesoria-generar-informe/:id', component: GenerarInformeLegalComponent },
            { path: 'informe-visualizar/:id', component: VisualizarInformeLegalComponent },
            { path: 'informe-editar/:id', component: EditarInformeLegalComponent },
            { path: 'credencial-listado', component: CredencialesListadoComponent },
            { path: 'nota-editar/:id', component: NotaEditarComponent },
            { path: 'postulante-editar/:id', component: EditarPostulanteComponent },
            { path: 'formulario-prelistado', component: FormTdrPrelistadoComponent },
            { path: 'form-tdr-copiar-pre/:id', component: FormTdrCopiarPreComponent },
            { path: 'form-tdr-editar-pre/:id', component: FormTdrEditarPreComponent },
            { path: 'credencial-seleccionado', component: CredencialesSeleccionadosComponent },
            { path: 'credencial-generar', component: CredencialesGenerarComponent },
            //Victor
            { path: 'direcciones/listado', component: DireccionesListadoComponent }, 
            { path: 'direccion-agregar', component: DireccionesCrearComponent }, 


        ]
    },
    
    { path: 'verificador/:id', component: VerificadorComponent },
    {path: 'error', component: AppErrorComponent},
    {path: 'error', component: AppErrorComponent},
    {path: 'accessdenied', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: 'login', component: AppLoginComponent},

   // {path: '**', redirectTo: '/notfound'},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
