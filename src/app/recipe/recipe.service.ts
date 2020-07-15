import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<recipe[]>();

  constructor(private http: HttpClient) { }

  public getRecipe(): Observable<any> {
    return this.http.get("https://test-4ad0c.firebaseio.com/recipe.json")
      .pipe(map(response => {
        let recipeList = []
        for (let key in response) {
          recipeList.push({ ...response[key], id: key })
        }
        return recipeList
      }), tap(recipe => {
        this.recipeChanged.next(recipe)
      }))
  }

  public saveRecipe(recipe: recipe): Observable<any> {
    return this.http.post("https://test-4ad0c.firebaseio.com/recipe.json", recipe)
  }

  public deleteRecipe(id:string): Observable<any> {
    //improve
    return this.http.delete(`https://test-4ad0c.firebaseio.com/recipe/${id}.json`)
  }

  public updateRecipe(recipe: recipe):Observable<any>{
    return this.http.put(`https://test-4ad0c.firebaseio.com/recipe/${recipe.id}.json`,recipe)
  }

}
