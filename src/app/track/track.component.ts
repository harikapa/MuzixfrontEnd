import { Component, OnInit } from '@angular/core';
import { Track } from '../modals/Track';
import { MuzixService } from '../muzix.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  public tracks: Track[];
  public track: Track;

  constructor(private muzixService: MuzixService, private route: ActivatedRoute
    , private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let searchString = params.get('searchString');
      this.muzixService.getLastFmTracks(searchString).subscribe((data) => {
        this.tracks = data.results.trackmatches.track;
        console.log("result is ", this.tracks);
      });
    })
  }

  async saveTrack(track: Track) {
    this.muzixService.getPlayList().subscribe((data) => {
      let isExists: boolean;

      data.forEach(
        (item) => {
          if (item.url == track.url) {
            alert("Track Already exists");
            isExists = true;
          }
        })

      if (!isExists) {
        alert("");
        this.muzixService.saveTrack(track).subscribe((data) => {
          this.track = data;
          console.log("result is ", this.track);
          this.toastrService.success('Added To PlayList');
        });
      }
    })
  }
}
