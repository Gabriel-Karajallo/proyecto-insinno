import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactConfirmationDialogComponent } from '../../shared/pages/contact-confirmation-dialog/contact-confirmation-dialog.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading: boolean = false;


  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }


  // enviar el formulario
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true

      //simulacon de peticion http
      setTimeout(() => {
        this.isLoading = false;
        this.openConfirmationDialog();
        this.contactForm.reset();
      }, 2000);

      console.log(this.contactForm.value);
      // Aquí se implementará la lógica para enviar el formulario más adelante.
    } else {
      console.error('Formulario no válido.');
    }
  }


  openConfirmationDialog() {
    this.dialog.open(ContactConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: '¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos pronto.',
      },
    });
  }
}
