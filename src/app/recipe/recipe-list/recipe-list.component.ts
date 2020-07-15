import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { recipe } from '../../models/recipe.model'
import { RecipeService } from '../recipe.service'
import { error } from '@angular/compiler/src/util';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { addRecipeDialog } from 'src/app/header/header.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  items: recipe[] = []


  constructor(
    public dialog: MatDialog,
    private recipeService: RecipeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon("detail", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/icons/detail.svg"))
    this.matIconRegistry.addSvgIcon("edit", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/icons/edit.svg"))

  }

  ngOnInit(): void {
    this.getRecipe()
    this.recipeService.recipeChanged.subscribe(recipes => {
      console.log(recipes);
      this.items = recipes
    }, error => {
      alert("error occured")
    })

  }

  getRecipe() {
    this.recipeService.getRecipe().subscribe()
  }

  deleteRecipe(id: string) {
    //add loader
    this.recipeService.deleteRecipe(id).subscribe(data => {
      this.recipeService.getRecipe().subscribe()
    })
  }

  editRecipe(recipe: recipe): void {
    const dialogconfig = new MatDialogConfig()
    console.log([recipe]);
    dialogconfig.data = [recipe]
    dialogconfig.width = "600px"
    const dialogRef = this.dialog.open(addRecipeDialog,dialogconfig);

    dialogRef.afterClosed().subscribe(result => {
      this.recipeService.getRecipe().subscribe()
     });

  }

}

