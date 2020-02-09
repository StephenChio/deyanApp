import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllQuestionPagePage } from './all-question-page.page';

const routes: Routes = [
  {
    path: '',
    component: AllQuestionPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllQuestionPagePage]
})
export class AllQuestionPagePageModule {}
