import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/auth/auth.service.service';
import { FattureService } from 'src/app/services/fatture.service';
import { Fattura } from 'src/app/_models/fattura.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-fattura',
  templateUrl: './pdf-fattura.component.html',
  styleUrls: ['./pdf-fattura.component.scss']
})
export class PdfFatturaComponent implements OnInit{

  id: number = 0;
  fattura!: Fattura;

  constructor(private authService: AuthService,
              private fattureService: FattureService,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
     this.authService.isAuthenticated();
     this.id = Number(this.activatedRoute.snapshot.url[1].path);
     this.fattureService.getFatturaById(this.id).subscribe(
        (fattura) => {this.fattura = fattura});
  }

  @ViewChild('htmlData') htmlData!: ElementRef;

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
