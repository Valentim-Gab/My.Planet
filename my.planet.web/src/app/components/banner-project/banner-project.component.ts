import { HttpResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Project } from 'src/app/interfaces/Project'
import { ProjectService } from 'src/app/services/project.service'

@Component({
  selector: 'app-banner-project',
  templateUrl: './banner-project.component.html',
  styleUrls: ['./banner-project.component.scss'],
})
export class BannerProjectComponent implements OnInit {
  @Output() emitterOpenPopup: EventEmitter<{ idProject: number }> =
    new EventEmitter()
  @Output() emitterOpenAlert: EventEmitter<{ idProject: number }> =
    new EventEmitter()
  @Input() project!: Project
  projectImg: string = '/assets/img/project_default.webp'

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    if (this.project && this.project.img)
      this.projectService.getImg(this.project.img).subscribe((item) => {
        this.projectImg = item
          ? ((item as HttpResponse<Blob>).url as string)
          : '/assets/img/project_default.webp'
      })
    else this.projectImg = '/assets/img/project_default.webp'
  }

  openPopup(idProject: number) {
    this.emitterOpenPopup.emit({ idProject: idProject })
  }

  openAlert(idProject: number) {
    this.emitterOpenAlert.emit({ idProject: idProject })
  }
}
