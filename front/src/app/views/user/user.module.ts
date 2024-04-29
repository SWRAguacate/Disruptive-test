import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCategoryComponent } from './register-category/register.product.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { RegisterContentComponent } from './register-content/register.content.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterCategoryComponent,
    RegisterContentComponent, UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutContainersModule
  ]
})
export class UserModule { }
