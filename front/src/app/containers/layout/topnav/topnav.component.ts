import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content/content.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
})
export class TopnavComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private subscription: Subscription;
  categorias: { id: string, cantidad: number }[] = [];

  constructor(private router: Router, private sessionService: UserService, private contentService: ContentService) {

    const self = this;
    this.contentService.getAll().subscribe({
      next(value: any) {
        const contenidos = value!!.Data;

        if(contenidos){
          const categoriasUnicas: string[] = [];

          contenidos.forEach((contenido: { idCategory: string; }) => {
            if (!categoriasUnicas.includes(contenido.idCategory)) {
              categoriasUnicas.push(contenido.idCategory);
            }
          });

          // Contar la cantidad de contenidos por cada categoría única
          categoriasUnicas.forEach(idCategory => {
            const cantidad = contenidos.filter((contenido: { idCategory: string; }) => contenido.idCategory === idCategory).length;
            self.categorias.push({ id: idCategory, cantidad: cantidad });
          });
        }
      },
      error(err: any) {
        console.log(err);
      },
    });

    this.subscription = this.sessionService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    if(localStorage.getItem('loggedUser')){
      this.sessionService.setLoggedIn(true);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  redirigir(){
    this.router.navigateByUrl('/dashboard');
  }

  logout(){
    localStorage.removeItem('loggedUser');
    this.sessionService.setLoggedIn(false);
  }
}
