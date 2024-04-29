import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutContainersModule,
    QRCodeModule
  ]
})
export class AppModule { }

