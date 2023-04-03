import { HttpResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { PersonalWorkService } from 'src/app/services/personal-works.service'

@Component({
  selector: 'app-banner-personal-work',
  templateUrl: './banner-personal-work.component.html',
  styleUrls: ['./banner-personal-work.component.scss'],
})
export class BannerPersonalWorkComponent implements OnInit {
  @Output() emitterOpenPopup: EventEmitter<{ idPersonalWork: number }> =
    new EventEmitter()
  @Output() emitterOpenAlert: EventEmitter<{ idPersonalWork: number }> =
    new EventEmitter()
  @Input() personalWork!: PersonalWork
  personalWorkImg: string = '/assets/img/project_default.webp'
  visibility: string = '/assets/img/eye_public.png'

  constructor(private personalWorkService: PersonalWorkService) {}

  ngOnInit(): void {
    if (this.personalWork && this.personalWork.img)
      this.personalWorkService
        .getImg(this.personalWork.img)
        .subscribe((item) => {
          this.personalWorkImg = item
            ? ((item as HttpResponse<Blob>).url as string)
            : '/assets/img/project_default.webp'
        })
    else this.personalWorkImg = '/assets/img/project_default.webp'

    console.log(this.personalWork)
    this.visibility = (this.personalWork.publicWork as boolean)
      ? '/assets/img/eye_public.png'
      : '/assets/img/eye_private.png'
  }

  openPopup(idPersonalWork: number) {
    this.emitterOpenPopup.emit({ idPersonalWork: idPersonalWork })
  }

  openAlert(idPersonalWork: number) {
    this.emitterOpenAlert.emit({ idPersonalWork: idPersonalWork })
  }

  updateVisibility() {
    this.personalWork.publicWork = !this.personalWork.publicWork
    this.personalWorkService
      .updateVisibility(this.personalWork)
      .subscribe((item) => {
        this.visibility = ((item as PersonalWork).publicWork as boolean)
          ? '/assets/img/eye_public.png'
          : '/assets/img/eye_private.png'
      })
  }
}
