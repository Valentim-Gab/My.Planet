import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PopupProjectComponent } from 'src/app/components/popup-project/popup-project.component'
import { MediaProject } from 'src/app/interfaces/MediaProject'
import { Project } from 'src/app/interfaces/Project'
import { MediaProjectService } from 'src/app/services/mediaProject.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
})
export class UserProjectsComponent implements OnInit {
  projects!: Project[] | null
  open = ''
  openEdit = ''
  openAlertProject = ''
  id = Number(this.route.snapshot.paramMap.get('id'))
  project!: Project | null
  mediaProject!: MediaProject | null
  id_project!: number
  searchedValue: string = ''
  searchedProjects!: Project[]
  noProjects: boolean = false

  constructor(
    private mediaService: MediaProjectService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refreshList()
  }

  @ViewChild('appPopupProject', { static: false }) child:
    | PopupProjectComponent
    | undefined
  callChildFunction(item: MediaProject) {
    this.mediaProject = item
    this.child!.refreshFormPopup(item)
  }

  openPopup(edit: boolean, project: null | Project | Object) {
    const project2: Project = project as Project

    if (edit)
      this.projectService.getProject(project2!.idProject!).subscribe((item) => {
        this.addMediaProject(item as Project)
      })
    else {
      if (this.open === '') this.open = 'open'
      else {
        this.open = ''
        this.addMediaProject(null)
      }
    }
  }

  addMediaProject(item: Project | null) {
    this.project = item
    if (this.open === '' && this.project)
      this.mediaService
        .getMediaProjectByProject(this.project.idProject!)
        .subscribe((item) => {
          this.openPopupEdit(item as MediaProject)
        })
    else this.mediaProject = item as null
  }

  openPopupEdit(item: MediaProject) {
    this.callChildFunction(item)
    if (this.open === '' && this.mediaProject) this.open = 'open'
  }

  refreshList() {
    this.projectService.getAllByUser(this.id).subscribe((item) => {
      this.projects = item as Project[]
      this.searchedProjects = item as Project[]
      this.noProjects = this.searchedProjects.length > 0 ? false : true
    })
  }

  openAlert(project?: Project | Object | null) {
    const project2 = project as Project

    if (this.openAlertProject === '') {
      this.openAlertProject = 'open'
      if (project) this.id_project = project2.idProject!
    } else this.openAlertProject = ''
  }

  deleteProject(id: number) {
    this.projectService.delete(id).subscribe((item) => {
      this.refreshList()
    })
    this.openAlert()
  }

  search(search: string) {
    this.searchedProjects = this.projects!.filter((project) => {
      return project.projectName
        ?.toLowerCase()
        .includes((search as string).toLowerCase())
    })
    this.noProjects = this.searchedProjects.length > 0 ? false : true
  }
}
