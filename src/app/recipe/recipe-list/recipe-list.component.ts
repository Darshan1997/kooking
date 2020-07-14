import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recipe } from '../../models/recipe.model'
import { RecipeService } from '../recipe.service'
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  items: recipe[] = []


  constructor(public dialog: MatDialog, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipe()
  }

  getRecipe() {
    this.recipeService.getRecipe().subscribe(recipes => {
      console.log(recipes);
      
      this.items = recipes

    }, error => {
      console.log(error);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: "hello" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './recipedialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
