import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dogmemes',
  templateUrl: './dogmemes.component.html',
  styleUrls: ['./dogmemes.component.css']
})
export class DogmemesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  API_URL: string = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dog';
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
