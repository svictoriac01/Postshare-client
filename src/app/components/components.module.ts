import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SubirPostComponent } from './subir-post/subir-post.component';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from './mapa/mapa.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { DetailsUserComponent } from './details-user/details-user.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    SubirPostComponent,
    MapaComponent,
    ActualizarUsuarioComponent,
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    PostsComponent,
    SubirPostComponent,
    ActualizarUsuarioComponent,
    DetailsUserComponent
  ]
})
export class ComponentsModule { }
