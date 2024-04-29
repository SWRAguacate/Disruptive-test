import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEdit, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { contenido } from 'src/app/models/modelos';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ContentService } from 'src/app/services/content/content.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  form: any;
  safeVideoUrl: SafeResourceUrl = '';
  idVideo: string = '';
  contenidos: contenido[] = [];
  contenidosOriginales: contenido[] = [];
  contenido: contenido = {
    _id: '',
    name: '',
    idContentType: '',
    idCategory: '',
    resource: '',
    credits: '',
    creationDate: ''
  };
  selectedInd: number = 0;
  faEdit: any;
  faExternalLinkAlt: any;
  isLoggedIn = false;
  private subscription: Subscription;

  constructor(private router: Router, private sessionService: UserService,
    private sanitizer: DomSanitizer, private contentService: ContentService){
    this.faEdit = faEdit;
    this.faExternalLinkAlt = faExternalLinkAlt;

    const self = this;
    this.contentService.getAll().subscribe({
      next(value: any) {
        const registers = value!!.Data;

        if(registers){
          registers.forEach((registro: any) => {
            self.contenidos.push({
              name: registro.name,
              idContentType: registro.idContentType,
              idCategory: registro.idCategory,
              resource: registro.resource,
              credits: registro.credits,
              creationDate: registro.creationDate,
              _id: registro._id
            })
          });

          self.contenidosOriginales = [...self.contenidos];
        }
      },
      error(err) {
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


  ngOnInit(): void {
    this.crearVacio();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('watchPublication')!!;
    modalElement.addEventListener('hidden.bs.modal', this.onModalHidden.bind(this));
  }

  onModalHidden() {
    const iframe: HTMLIFrameElement | null = document.getElementById('miIframe') as HTMLIFrameElement;

    if (iframe) {
      iframe.contentWindow!!.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    } else {
      // Si el iframe no existe, ocultar el botón de cerrar modal
      const btnDismissModal: HTMLElement | null = document.getElementById('btnDismissModal');
      if (btnDismissModal) {
        btnDismissModal.style.display = 'none';
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal(contenido: contenido) {
    this.selectedInd = this.contenidos.findIndex(content => content._id === contenido._id);
    this.form = this.contentService.crearFormularioContenido(contenido);
  }

  crearVacio(){
    let content: contenido = {}
    this.form = this.contentService.crearFormularioContenido(content);
  }

  validarFormulario() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      throw 'formulario invalido';
    }
  }

  tieneError(controlName: any) {
    if (this.form) {
      let control = this.form.get(controlName);
      return control?.invalid && control.touched;
    }
    return false;
  }

  actualizar() {
    const self = this;

    this.validarFormulario();

    const id: string = this.contenidos[this.selectedInd]._id as string;

    const json = {
      name: this.form.value.name,
      idContentType: this.contenidos[this.selectedInd].idContentType,
      idCategory: this.contenidos[this.selectedInd].idCategory,
      resource: this.contenidos[this.selectedInd].resource,
      credits: this.contenidos[this.selectedInd].credits,
      creationDate: this.contenidos[this.selectedInd].creationDate
    }

    this.contentService.updateContent(json, id).subscribe({
      next(value: any) {
        self.contenidos[self.selectedInd] = value.Data.cambios;
        (document.getElementById('btnDismissModal') as HTMLButtonElement).click();
        const card = document.getElementById(id);

        if(card){
          const titleElement = card.querySelector('.card-title') as HTMLBodyElement;
          const descriptionElement = card.querySelector('.card-text') as HTMLBodyElement;

          if (titleElement) {
            const spanElement = titleElement.querySelector('span');

            if (spanElement) {
              spanElement.innerText = json.name;
            }
          }

          if (descriptionElement) {
            descriptionElement.innerText = json.name;
          }
        }
      },
      error(err) {
        console.log(err);
        self.router.navigateByUrl('/error500');
      },
    });

    this.crearVacio();
  }

  openLink(url: string){
    window.open(url, '_blank');
  }

  obtenerIdDeVideo(url: string): string | null {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  }

  goToProduct(content: contenido){
    this.contenido = content;
    if(content.idContentType == 'URL' && this.contenido.resource != undefined){
      this.idVideo = this.obtenerIdDeVideo(this.contenido.resource as string)!!;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(('https://www.youtube.com/embed/' + this.idVideo) as string);
    }
  }

  buscarCoincidencias(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    if (textoBusqueda.trim() === '') {
      this.contenidos = [...this.contenidosOriginales];
    } else {
      this.contenidos = this.contenidosOriginales.filter((content: contenido) =>
        content!!.name!!.toLowerCase().includes(textoBusqueda)
      );
    }
  }
}
