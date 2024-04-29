import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { contenido } from 'src/app/models/modelos';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  contents: contenido[] = [];

  constructor(private router: Router, private service: ContentService){
    const self = this;
    this.service.getAll().subscribe({
      next(value: any) {
        console.log(value)
        const contents = value!!.Data;

        if(contents){
          contents.forEach((prospect: any) => {
            self.contents.push({
              name: contents.name,
              idContentType: contents.idContentType,
              idCategory: contents.idCategory,
              resource: contents.resource,
              credits: contents.credits,
              creationDate: contents.creationDate,
              _id: contents._id
            })
          });
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
