import { BadRequestException } from '@nestjs/common';
import { ObjectDto } from '../../object.dto';
import { isSuported } from './utils/is-suported';

export const validateFiles = (
  newObject: ObjectDto,
  files: Express.MulterS3.File[],
) => {
  if (!files['objectFile']) {
    throw new BadRequestException([
      'Um arquivo deve ser selecionado para o objeto',
    ]);
  }
  const objectFile = files['objectFile'][0];
  const { mimetype } = objectFile;

  console.log(files['objectFile']);
  console.log(typeof objectFile);

  isSuported(mimetype);

  if (files['objectFile'].length == 1) {
    // Imagens
    if (
      mimetype.startsWith('image/png') ||
      mimetype.startsWith('image/jpg') ||
      mimetype.startsWith('image/jpeg')
    ) {
      newObject.thumb = {
        name: objectFile.key,
        path: objectFile.location,
      };
      // Vídeos
    } else if (mimetype.startsWith('video/mp4')) {
      newObject.thumb = {
        name: `default-thumb-mp4-${objectFile.key}`,
        path: `/objects/default-thumb-mp4.png`,
      };
      // Vetores
    } else if (
      mimetype.startsWith('application/ai') ||
      mimetype.startsWith('image/svg') ||
      mimetype.startsWith('application/postscript')
    ) {
      newObject.thumb = {
        name: `default-thumb-vetor-${objectFile.key}`,
        path: '/objects/default-thumb-vetor.png',
      };
      // E-books
    } else if (mimetype.startsWith('application/pdf')) {
      newObject.thumb = {
        name: `default-thumb-pdf-${objectFile.key}`,
        path: '/objects/default-thumb-pdf.png',
      };
      // Apresentações
    } else if (
      mimetype.startsWith(
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      )
    ) {
      newObject.thumb = {
        name: `default-thumb-pptx-${objectFile.key}`,
        path: '/objects/default-thumb-pptx.png',
      };
      // Áudios
    } else if (mimetype.startsWith('audio/mpeg')) {
      newObject.thumb = {
        name: `default-thumb-mp3-${objectFile.key}`,
        path: '/objects/default-thumb-mp3.png',
      };
    } else {
      newObject.thumb = {
        name: `default-thumb-${objectFile.key}`,
        path: `/objects/default-thumb-image.png`,
      };
    }
  } else if (files['objectFiles'].length == 2) {
    newObject.thumb = {
      name: files[1].key,
      path: files[1].location,
    };
  } else {
    throw new BadRequestException([
      'Dois arquivos suportados: objectFile e thumb',
    ]);
  }

  // config file
  newObject.objectFile = {
    mimetype: objectFile.mimetype,
    name: objectFile.key,
    size: objectFile.size,
    path: objectFile.location,
  };

  return {
    thumb: newObject.thumb,
    objectFile: newObject.objectFile,
  };
};
