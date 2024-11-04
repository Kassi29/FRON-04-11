import { Component, importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './links/register/register.component';
import { RecoverComponent } from './links/recover/recover.component';
import { UserssComponent } from './pages/main2/userss/userss.component';
import { Main2Component } from './pages/main2/main2.component';
import { MainComponent } from './pages/main/main.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AddcategoriaComponent } from './categorias/addcategoria/addcategoria.component';
import { LiscategoriasComponent } from './categorias/liscategorias/liscategorias.component';
import { ArtesanoComponent } from './pages/main2/roles/artesano/artesano.component';
import { DeliveryComponent } from './pages/main2/roles/delivery/delivery.component';
import { AddalmacenComponent } from './almacen/addalmacen/addalmacen.component';
import { LisalmacenComponent } from './almacen/lisalmacen/lisalmacen.component';


import { MainUserComponent } from './pages/main-user/main-user.component';
import { ListcomunidadComponent } from './comunidad/listcomunidad/listcomunidad.component';
import { AddcomunidadComponent } from './comunidad/addcomunidad/addcomunidad.component';
import { AddempresaComponent } from './empresa/addempresa/addempresa.component';
import { ListempresaComponent } from './empresa/listempresa/listempresa.component';
import { AddadministradorComponent } from './administrador/addadministrador/addadministrador.component';
import { ListadministradorComponent } from './administrador/listadministrador/listadministrador.component';
import { AddartesanosComponent } from './artesanos/addartesanos/addartesanos.component';
import { ListartesanosComponent } from './artesanos/listartesanos/listartesanos.component';
import { AdddeliveryComponent } from './delivery/adddelivery/adddelivery.component';
import { ListdeliveryComponent } from './delivery/listdelivery/listdelivery.component';


import { MainArtComponent } from './pages/main-art/main-art.component';
import { AddproductoComponent } from './productos/addproducto/addproducto.component';
import { ListproductoComponent } from './productos/listproducto/listproducto.component';
import { CatalogoComponent } from './productos/catalogo/catalogo.component';
import { PasswordComponent } from './password/password/password.component';
import { PagoComponent } from './pago/pago.component';

import { MainDelivComponent } from './pages/main-deliv/main-deliv.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AutentificacionComponent } from './autentificacion/autentificacion.component';
import { ListcPedidosComponent } from './cPedidos/listc-pedidos/listc-pedidos.component';
import { ListdPedidosComponent } from './dPedidos/listd-pedidos/listd-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: 'web/inicio', pathMatch: 'full' },

  {path: 'web', component:MainComponent, children: [
    {path:'inicio', component:DashboardComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path: 'recover', component:RecoverComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'auth', component: AutentificacionComponent}
  ]},

  {path: 'web2', component:MainUserComponent, children: [
    {path:'inicio', component:DashboardComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'passw', component: PasswordComponent },
    {path: 'pago', component: PagoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'pedidos', component: ListcPedidosComponent}

  ]},

  {path: 'artesano', component:MainArtComponent, children: [
    {path:'registerpro', component:AddproductoComponent},
    {path: 'listpro', component: ListproductoComponent},
    {path: 'passw', component: PasswordComponent }
  ]},

  {path: 'delivery', component:MainDelivComponent, children: [
    {path: 'passw', component: PasswordComponent },
    {path: 'pedidos', component: ListdPedidosComponent }
  ]},


  {path: 'panel', component:Main2Component, children:[

    {path: 'userss', component:UserssComponent},
    {path: 'categorias', component:CategoriasComponent},
    {path: 'registercat', component:AddcategoriaComponent},
    {path: 'listcat', component: LiscategoriasComponent},
    {path: 'artesano', component:ArtesanoComponent},
    {path: 'delivery', component:DeliveryComponent},
    {path: 'registeralm', component: AddalmacenComponent},
    {path: 'listalm', component: LisalmacenComponent},
    {path: 'registercom', component: AddcomunidadComponent},
    {path: 'listcom', component: ListcomunidadComponent},
    {path: 'registeremp', component: AddempresaComponent},
    {path: 'listemp', component: ListempresaComponent},
    {path: 'registerprod', component: AddproductoComponent},
    {path: 'admin', component: AddadministradorComponent},
    {path: 'listadmin', component: ListadministradorComponent},
    {path: 'artes', component: AddartesanosComponent},
    {path: 'listart', component: ListartesanosComponent},
    {path: 'deliv', component: AdddeliveryComponent},
    {path: 'listdeliv', component: ListdeliveryComponent}

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
