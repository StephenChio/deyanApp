import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WriteAnswerPagePage } from './write-answer-page.page';

const routes: Routes = [
  {
    path: '',
    component: WriteAnswerPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WriteAnswerPagePage]
})
export class WriteAnswerPagePageModule {}
