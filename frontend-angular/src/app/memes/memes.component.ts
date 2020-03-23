import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  API_URL: string = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat';
  ShowMeme() {
    fetch(this.API_URL)
    .then(response => response.json())
    .then(function (json) {
        var image = document.createElement('img');
        image.src = json.data.image_url;
        //document.body.appendChild(image);
        console.log(json.data.image_url);
        document.getElementById("pasteMemes").appendChild(image);
      }).catch(err => {
        console.error('Error:', err);
      })
  }
}
