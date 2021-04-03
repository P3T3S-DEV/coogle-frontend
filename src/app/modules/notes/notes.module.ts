import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { CoreModule } from '../core/core.module';

import { AccordionModule  } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    CoreModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class NotesModule { }
