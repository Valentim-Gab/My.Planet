import { HttpResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { MediaProject } from 'src/app/interfaces/MediaProject'
import { Project } from 'src/app/interfaces/Project'
import { MediaProjectService } from 'src/app/services/mediaProject.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
  selector: 'app-perfil-project',
  templateUrl: './perfil-project.component.html',
  styleUrls: ['./perfil-project.component.scss'],
})
export class PerfilProjectComponent implements OnInit {
  @Input() project!: Project
  popupVideo = ['popup-video']
  mediaProject!: MediaProject
  linkVideo!: string
  projectImg: string = '/assets/img/project_default.webp'
  mediaImg: string = '/assets/img/media_default.png'

  constructor(
    private mediaProjectService: MediaProjectService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.project && this.project.img)
      this.projectService.getImg(this.project.img).subscribe((item) => {
        this.projectImg = item
          ? ((item as HttpResponse<Blob>).url as string)
          : '/assets/img/project_default.webp'
      })
    else this.projectImg = '/assets/img/project_default.webp'

    this.mediaProjectService
      .getMediaProjectByProject(this.project.idProject!)
      .subscribe((item) => {
        this.addMediaProject(item as MediaProject)
      })
  }

  addMediaProject(item: MediaProject) {
    this.mediaProject = item
    if (this.mediaProject && this.mediaProject.img)
      this.mediaProjectService
        .getImg(this.mediaProject.img)
        .subscribe((item) => {
          this.mediaImg = item
            ? ((item as HttpResponse<Blob>).url as string)
            : '/assets/img/media_default.png'
        })
    else this.mediaImg = '/assets/img/media_default.png'
  }

  openVideo(iframe?: HTMLIFrameElement, link?: string) {
    if (this.popupVideo.includes('open')) {
      this.popupVideo = ['popup-video']
      if (iframe) iframe.src = ''
    } else {
      this.popupVideo = ['popup-video', 'open']
      if (link && iframe) iframe.src = `https://www.youtube.com/embed/${link}`
    }
  }
}
