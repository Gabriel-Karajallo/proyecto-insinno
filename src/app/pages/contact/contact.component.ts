import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  // Método para enviar el formulario (pendiente de lógica backend)
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Aquí se implementará la lógica para enviar el formulario más adelante.
    } else {
      console.error('Formulario no válido.');
    }
  }
}
