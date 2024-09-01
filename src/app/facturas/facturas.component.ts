import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FacturaService } from '../Services/factura.service'; // Asegúrate de que la ruta sea correcta
import { IFactura } from '../Interfaces/factura'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  listafacturas: IFactura[] = [];
  factura: IFactura = {
    Fecha: '',
    Sub_total: 0,
    Sub_total_iva: 0,
    Valor_IVA: 0,
    Clientes_idClientes: 0
  };

  constructor(private facturaServicio: FacturaService, private router: Router) {}

  eliminarFactura(idFactura: number): void {
    Swal.fire({
      text: '¿Está seguro que desea eliminar la factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Factura'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.facturaServicio.eliminar(idFactura).subscribe((data: number) => {
          if (data === 1) {
            this.listafacturas = this.listafacturas.filter((factura) => factura.idFactura !== idFactura);
          }
        });
      }
    });
  }

  actualizarFactura(): void {
    this.facturaServicio.actualizar(this.factura).subscribe({
      next: (response) => {
        console.log('Factura actualizada con éxito:', response);
        Swal.fire({
          text: 'Factura actualizada con éxito',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/ruta-deseada']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar la factura:', error);
      }
    });
  }
}