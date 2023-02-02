import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-loader-planet',
  templateUrl: './loader-planet.component.html',
  styleUrls: ['./loader-planet.component.scss'],
})
export class LoaderPlanetComponent implements OnInit {
  @Input() show!: string

  constructor() {}

  ngOnInit(): void {}
}
