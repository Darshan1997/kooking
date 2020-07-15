import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { recipe } from '../models/recipe.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerEvent: any;
  routeUrl: string = '';

  constructor(private router: Router, public dialog: MatDialog, public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.router.events.subscribe((events: Event) => {
      if (events instanceof NavigationEnd) {
        console.log(events);

        this.routeUrl = events.urlAfterRedirects
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(addRecipeDialog, { width: "600px" });

    dialogRef.afterClosed().subscribe(result => {
      this.recipeService.getRecipe().subscribe()
    });
  }


}

@Component({
  selector: 'addRecipeDialog',
  templateUrl: '../dialogs/addrecipedialog.html',
  styleUrls: ['../dialogs/css/addrecipedialog.css']
})
export class addRecipeDialog implements OnInit {

  recipeForm: FormGroup = null;
  recipeData: recipe;
  editData: boolean = false;
  id: string;


  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<addRecipeDialog>,
    public recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) recipe: recipe[]) {
    if (recipe.length > 0) {
      this.recipeData = recipe[0]
      this.editData = true
    }

  }
  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipeName: '',
      ingredients: '',
      category: '',
      recipe: '',
      imageurl: ''
    })

    this.setFormValueIfExists()
  }

  setFormValueIfExists() {
    console.log(this.recipeData);
    const { id, ...recipedetails } = this.recipeData
    this.recipeForm.setValue(recipedetails)
  }

  saveRecipe() {
    this.recipeData = this.recipeForm.value
    this.recipeService.saveRecipe(this.recipeData).subscribe(data => {
      console.log(data);

      this.onNoClick()
    }, error => {
      alert("some error occured")
    })

  }

  updateRecipe() {
    this.recipeData = { ...this.recipeForm.value, id: this.recipeData.id }
    this.recipeService.updateRecipe(this.recipeData).subscribe(data => {
      console.log(data);

      this.onNoClick()
    }, error => {
      alert("some error occured")
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
