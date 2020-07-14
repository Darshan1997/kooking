import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'recipe', pathMatch:"full", component: RecipeComponent },
  { path: 'shopping', pathMatch:"full", component: ShoppingComponent },
  { path: '', pathMatch:"full", redirectTo:"/recipe" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
