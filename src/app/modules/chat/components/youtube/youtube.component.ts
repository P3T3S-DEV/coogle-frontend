import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/http/youtube/youtube.service';

@Component({
  selector: 'youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  public youtubeVideoForm = new FormGroup({
    videoName: new FormControl("", [
      Validators.required,
      Validators.maxLength(50)
    ])
  })

  public readonly baseEmbededVideo: string = "https://www.youtube-nocookie.com/embed/";

  public youtubeVideo: string;
  public youtubeVideoID: string;
  public thumbnails: string[];
  public videoTitle: string;

  public loading: boolean;
  public hasError: boolean;
  public errorMessage: string;


  constructor(
    private _searchVideo: YoutubeService,
    private dom: DomSanitizer) {
    this.youtubeVideo = "";
    this.youtubeVideoID = "";
    this.thumbnails = [];
    this.videoTitle = "";

    this.loading = true;
    this.hasError = false;
    this.errorMessage = "";
  }

  get getInputVideoName() {
    return this.youtubeVideoForm.get('videoName');
  }

  ngOnInit(): void {
  }

  searchVideo() {
    this._searchVideo.searchVideo(this.getInputVideoName?.value).subscribe(
      video => {
        let thumbnails = video.items[0].snippet.thumbnails;
        this.hasError = false;
        this.youtubeVideoID = video.items[0].id.videoId;
        this.thumbnails.push(thumbnails.default.url, thumbnails.medium.url, thumbnails.high.url);
        this.videoTitle = video.items[0].snippet.title;
        this.youtubeVideo = `${this.baseEmbededVideo}${this.youtubeVideoID}`;
        this.loading = false;
      },
      error => {
        this.loading = true;
        this.hasError = true;
        this.errorMessage = error;
      }
    );
  }

  getYoutubeVideoSanitized() {
    return this.dom.bypassSecurityTrustResourceUrl(this.youtubeVideo);
  }
}
