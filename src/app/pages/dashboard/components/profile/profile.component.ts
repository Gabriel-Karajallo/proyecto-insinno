import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractWebService } from '../../../../core/services/abstract-web.service';
import { DataManagementService } from '../../../../core/services/data-management.service';
import { Data } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AbstractWebService: AbstractWebService,
    private DataManagementService: DataManagementService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''] // Opcional, solo para cambiar la contraseña
    });

    this.DataManagementService.getUser('USER_ID_AQUI').subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario enviado:', this.profileForm.value); //por consola enío exitoso

      this.DataManagementService.updateUser('USER_ID_AQUI', this.profileForm.value).subscribe(
        () => alert('Perfil actualizado exitosamente'),
        err => console.error('Error actualizando perfil', err)
      );
    }
  }
}


