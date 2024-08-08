import { BadRequestException } from '@nestjs/common';

export const formatType = (mimetype: string) => {
  switch (mimetype) {
    case 'image/png' || 'image/jpg' || 'image/jpeg':
      return 'image';

    case 'video/mp4':
      return 'video';

    case 'application/ai' || 'application/postscript' || 'image/svg':
      return 'illustrations';

    case 'application/pdf':
      return 'book';

    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'presentation';

    case 'audio/mpeg':
      return 'audio';

    default:
      throw new BadRequestException(['Arquivo não suportado']);
  }
};
