import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RecoverComponent } from './links/recover/recover.component';
import { RegisterComponent } from './links/register/register.component';
import { PresentationComponent } from './dash/presentation/presentation.component';
import { SliderComponent } from './pages/main2/slider/slider.component';
import { MainComponent } from './pages/main/main.component';
import { Main2Component } from './pages/main2/main2.component';
import { FormsModule} from '@angular/forms';
import { ServiceService } from './Service/service.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CarouselComponent } from './pages/dashboard/componentes/carrusel/carrusel.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LiscategoriasComponent } from './categorias/liscategorias/liscategorias.component';
import { AddcategoriaComponent } from './categorias/addcategoria/addcategoria.component';
import {AuthInterceptor} from "./realAuth/interceptor/auth.interceptor";
import { DeliveryComponent } from './pages/main2/roles/delivery/delivery.component';
import { ArtesanoComponent } from './pages/main2/roles/artesano/artesano.component';
import { AddalmacenComponent } from './almacen/addalmacen/addalmacen.component';
import { LisalmacenComponent } from './almacen/lisalmacen/lisalmacen.component';
import { MainUserComponent } from './pages/main-user/main-user.component';
import { Header2Component } from './shared/header2/header2.component';
import { MapComponent } from './almacen/map/map.component';
import { AddcomunidadComponent } from './comunidad/addcomunidad/addcomunidad.component';
import { ListcomunidadComponent } from './comunidad/listcomunidad/listcomunidad.component';
import { AddempresaComponent } from './empresa/addempresa/addempresa.component';
import { ListempresaComponent } from './empresa/listempresa/listempresa.component';
import { AddproductoComponent } from './productos/addproducto/addproducto.component';
import { ListproductoComponent } from './productos/listproducto/listproducto.component';
import { MainArtComponent } from './pages/main-art/main-art.component';
import { SliderArtComponent } from './pages/main-art/slider-art/slider-art.component';
import { CatalogoComponent } from './productos/catalogo/catalogo.component';
import { PasswordComponent } from './password/password/password.component';
import { AddartesanosComponent } from './artesanos/addartesanos/addartesanos.component';
import { ListartesanosComponent } from './artesanos/listartesanos/listartesanos.component';
import { AddadministradorComponent } from './administrador/addadministrador/addadministrador.component';
import { ListadministradorComponent } from './administrador/listadministrador/listadministrador.component';
import { AdddeliveryComponent } from './delivery/adddelivery/adddelivery.component';
import { ListdeliveryComponent } from './delivery/listdelivery/listdelivery.component';
import { MainDelivComponent } from './pages/main-deliv/main-deliv.component';
import { SliderDelivComponent } from './pages/main-deliv/slider-deliv/slider-deliv.component';
import {NgOptimizedImage} from "@angular/common";
import { VerproductoComponent } from './productos/verproducto/verproducto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';
import { AutentificacionComponent } from './autentificacion/autentificacion.component';
import { ListcPedidosComponent } from './cPedidos/listc-pedidos/listc-pedidos.component';
import { ListdPedidosComponent } from './dPedidos/listd-pedidos/listd-pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RecoverComponent,
    RegisterComponent,
    PresentationComponent,
    SliderComponent,
    MainComponent,
    Main2Component,
    CarouselComponent,
    CategoriasComponent,
    LiscategoriasComponent,
    AddcategoriaComponent,
    DeliveryComponent,
    ArtesanoComponent,
    AddalmacenComponent,
    LisalmacenComponent,
    MainUserComponent,
    Header2Component,
    MapComponent,
    AddcomunidadComponent,
    ListcomunidadComponent,
    AddempresaComponent,
    ListempresaComponent,
    AddproductoComponent,
    ListproductoComponent,
    MainArtComponent,
    SliderArtComponent,
    CatalogoComponent,
    PasswordComponent,
    AddartesanosComponent,
    ListartesanosComponent,
    AddadministradorComponent,
    ListadministradorComponent,
    AdddeliveryComponent,
    ListdeliveryComponent,
    MainDelivComponent,
    SliderDelivComponent,
    VerproductoComponent,
    CarritoComponent,
    PagoComponent,
    AutentificacionComponent,
    ListcPedidosComponent,
    ListdPedidosComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgOptimizedImage,
    ],
  providers: [ServiceService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
