import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Person } from './person.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public people: Array<Person>;
  public selectedPerson: Person;
  public counter: number;


  constructor(private httpService: HttpService) {
    this.httpService.Get<Person[]>('api/people').subscribe(
      data => this.people = <Person[]>data,
      error => console.log(JSON.stringify(error))
    );
  }

  public getPerson(id: number) {
    this.httpService.Get<Person>('api/people/' + id).subscribe(
      data => {
        this.selectedPerson = data 
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  public testCounter() {
    var obs = this.httpService.Get<number>('api/counter');
    obs.subscribe(
      data => this.counter = data,
      error => console.log(JSON.stringify(error))
    );
    obs.subscribe(
      data => this.counter = data,
      error => console.log(JSON.stringify(error))
    );
  }

  public resetCounter() {
    this.httpService.Put('api/counter').subscribe(
      data => this.counter = 0
    );
  }

  private sub: Subscription;
  public getAsync(num: number) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    
    this.sub = this.httpService.Get('api/counter/Interruption?num=' + (num * 1000)).subscribe(
      {
        next: data => console.log(data)
      }
    )
  }
}
