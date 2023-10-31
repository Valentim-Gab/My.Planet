package site.my.planet.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

@Component
public class ImageUtil {

    public String save(MultipartFile multipartFile, Long id, String table) {
        String rootDirectory = "src/main/resources/static/temp/" + table;
        File dir = new File(rootDirectory);
        
        if (!dir.exists()) {
            if (dir.mkdirs())
                System.out.println("Diretório criado com sucesso: " + dir.getAbsolutePath());
            else
                System.err.println("Falha ao criar o diretório: " + dir.getAbsolutePath());
        }
        
        try {
            String fileName = multipartFile.getOriginalFilename();
            String fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            String uuid = UUID.randomUUID().toString();
            deleteImage(dir, id);
            fileName = "id=" + Long.toString(id) + "-" + table + "=" + uuid + "." + fileExtension;
            String filePath = dir.getAbsolutePath() + "/" + fileName;
            File fileDest = new File(filePath);
            multipartFile.transferTo(fileDest);
            compressImage(filePath);
        
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    public ResponseEntity<byte[]> get(String imgName, String table) {
        try {
            String rootDirectory = "src/main/resources/static/temp/" + table + "/" + imgName;
            File file = new File(rootDirectory);

            try (FileInputStream fileInputStream = new FileInputStream(file)) {
                FileChannel fileChannel = fileInputStream.getChannel();
                byte[] imgBytes = new byte[(int) fileChannel.size()];
                ByteBuffer byteBuffer = ByteBuffer.wrap(imgBytes);
                fileChannel.read(byteBuffer);
                fileChannel.close();
                return ResponseEntity.ok().contentType(getMediaType(file)).body(imgBytes);
            }
        } catch (IOException e) {
            System.out.println("Imagem { " + imgName + " } não encontrada!");
        }
        return ResponseEntity.badRequest().body(null);
    }

    public MediaType getMediaType(File file) {
        MediaType mediaType = MediaType.IMAGE_JPEG;
        String fileName = file.getAbsolutePath();
        String fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (fileExtension.equals("png"))
            mediaType = MediaType.IMAGE_PNG;
        else if (fileExtension.equals("gif"))
            mediaType = MediaType.IMAGE_GIF;
        else
            mediaType = MediaType.IMAGE_JPEG;
        return mediaType;
    }

    public void compressImage(String imagePath) {
        try {
            String rootDirectory = "src/main/java/site/my/planet/util/python/dist";
            Process process = Runtime.getRuntime().exec(
                    rootDirectory + "/compressImage.exe " + imagePath);
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void deleteImage(File dir, long id) {
        File[] files = dir.listFiles();

        if (files != null && files.length > 0) {
            for (File image : files)
                if (image.getName().contains("id=" + Long.toString(id)))
                    image.delete();
        }
    }
}
