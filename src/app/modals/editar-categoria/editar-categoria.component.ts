import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ValidService } from 'src/app/core/valid/valid.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  @Input() categoria: any;
  atualizando: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  validaCategoria() {
    return this.categoria.nome !== '' && !this.atualizando
  }

  salvar() {
    //console.log(this.categoria);

    this.atualizando = true;
    
    this.categoriaService.editarCategoria(this.categoria).subscribe(
      (result) => {
        if (result) {
          this.toastr.success('Categoria salva com sucesso.');
          this.activeModal.close();
        }        
        this.atualizando = true;
      }, (error) => {
        this.atualizando = true;
        this.toastr.error('Erro ao salvar categoria.');
        console.log(error);        
      }
    )
  }
}
