import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '../../services/short-url.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'

import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {


  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;


  constructor(private _shortUrlService: ShortUrlService,
              private router: Router) { 
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
  }

  ngOnInit(): void {
  }

  procesarUrl() {

    this.loading = true;
    this.urlProcesada = false;
    
    
    this._shortUrlService.getShortUrl(this.nombreUrl)
    .pipe(delay(2000))
    .subscribe(data => {
      this.urlShort = data.link;
      this.urlProcesada = true;
      this.loading = false;
    }, error => {      
      this.loading = false;
      
      if(error.error.description === 'The value provided is invalid.') {
        
        this.mostrarMensaje('Url no es válida', 'error');
        this.nombreUrl = '';
        this.urlProcesada = false;

      }



    });
  }

  quitarUrl(valor: string) {
    
    
    if(valor === '') {
      this.urlProcesada = false;
    }
    
  }

  copiarPortapapeles(inputElement: HTMLInputElement){
 
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


  copyClipboard() {

    this.mostrarMensaje('Url copiada en el portapapeles :)', 'success');

  }


  mostrarMensaje(mensaje: string, icono: SweetAlertIcon) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icono,
      title: mensaje
    })
  }

}
