import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImageUtil {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}`

  constructor() {}

  updateTitle(
    event: Event,
    file_file_name: HTMLInputElement,
    formData: FormData
  ) {
    const target = event.target as HTMLInputElement

    if (target.files!.length > 0) {
      file_file_name.value = target.files![0].name
      formData.set('img', target.files![0])
    } else {
      file_file_name.ariaPlaceholder = 'Escolha uma imagem'
    }
  }

  fileChange(event: Event, ImagePopupImg: HTMLImageElement): Blob | string {
    const reader = new FileReader()

    reader.onload = () => {
      ImagePopupImg.src = reader.result as string
    }
    const target = event.target as HTMLInputElement
    reader.readAsDataURL(target.files![0])

    return target.files![0]
  }

  removeImg(
    imgUpload: string | null,
    imageSrc: string,
    formData: FormData
  ): string {
    if (imgUpload) imgUpload = imageSrc
    formData.delete('img')
    formData.set('deleteImage', 'present')
    return imageSrc
  }

  requestImgSearchUser(imgName: string) {
    return imgName
      ? `${this.url}/user/img/${imgName}`
      : '/assets/img/default_profile.png'

    //     if (imgName)
    //   return this.userService.getImg(imgName).subscribe(item => {
    //     return (item) ?
    //     `${this.url}/user/img/${imgName}` :
    //     '/assets/img/default_profile.png'
    //   })
    // else
    //   return '/assets/img/default_profile.png'
  }
}
