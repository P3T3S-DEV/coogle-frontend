import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/notes/categories/categorie.model';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public isCollapsed: boolean = false;
  public customClass: string = 'customClass';

  public groups: Categorie[];

  public Learning: any[] = [];
  public Work: any[] = [];
  public Others: any[] = [];

  categorieForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)])
  })
  constructor(
    private router: Router
  ) { 
    this.groups = [
      {
        title: 'Learning'
      },
      {
        title: 'Work'
      },
      {
        title: 'Others'
      }
    ];
  }
  ngOnInit(): void {
  }

  get getInputTitle() {
    return this.categorieForm.get('title');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/signin')
  }
  
  rowPressed(){
    console.log("pressed")
  }

  createCategorie(){
    let categorie: Categorie = {
      title: this.getInputTitle?.value,
    }
    this.groups.push(categorie);
    this.categorieForm.reset();
  }
}
