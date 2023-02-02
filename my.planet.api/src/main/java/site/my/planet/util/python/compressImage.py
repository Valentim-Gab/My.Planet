from PIL import Image, ImageSequence
from math import floor, fabs
import sys


def transform_image(original_img, crop_w, crop_h):
    img_w, img_h = (original_img.size[0], original_img.size[1])
    n_frames = getattr(original_img, 'n_frames', 1)

    def transform_frame(frame):

        if crop_w is None:
            if crop_h == img_h:
                return frame
            new_w = floor(img_w * crop_h / img_h)
            new_h = crop_h
            return frame.resize((new_w, new_h))

        if crop_w == img_w and crop_h == img_h:
            return frame

        w_diff = fabs(crop_w - img_w)
        h_diff = fabs(crop_h - img_h)
        enlarge_image = True if crop_w > img_w or crop_h > img_h else False
        shrink_image = True if crop_w < img_w or crop_h < img_h else False

        if enlarge_image is True:
            new_w = floor(crop_h * img_w /
                          img_h) if h_diff > w_diff else crop_w
            new_h = floor(crop_w * img_h /
                          img_w) if h_diff < w_diff else crop_h

        if shrink_image is True:
            new_w = crop_w if h_diff > w_diff else floor(
                crop_h * img_w / img_h)
            new_h = crop_h if h_diff < w_diff else floor(
                crop_w * img_h / img_w)

        left = (new_w - crop_w) // 2
        right = left + crop_w
        top = (new_h - crop_h) // 2
        bottom = top + crop_h

        return frame.resize((new_w, new_h)).crop((left, top, right, bottom))

    if n_frames == 1:
        return transform_frame(original_img)

    else:
        frames = []
        for frame in ImageSequence.Iterator(original_img):
            frames.append(transform_frame(frame))
        return frames


def save_new_gif(new_frames, old_gif_information, new_path):
    new_frames[0].save(new_path,
                       save_all=True,
                       append_images=new_frames[1:],
                       duration=old_gif_information['duration'],
                       loop=old_gif_information['loop'],
                       background=old_gif_information['background'],
                       extension=old_gif_information['extension'],
                       transparency=old_gif_information['transparency'])


image_path = sys.argv[1]
image = Image.open(image_path)
extension = (image.format).lower()
file_name = image.fp.name

if image.size[0] > 500 or image.size[1] > 500:
    if extension != "gif":
        image = image.resize((500, 500))

        if extension == "jpg":
            extension = "JPEG"

        image.save(file_name, extension)
    else:
        frames = transform_image(image, 500, 500)
        old_gif_information = {
            'loop': bool(image.info.get('loop', 1)),
            'duration': image.info.get('duration', 40),
            'background': image.info.get('background', 223),
            'extension': image.info.get('extension', (b'NETSCAPE2.0')),
            'transparency': image.info.get('transparency', 223)
        }
        save_new_gif(frames, old_gif_information, image_path)
