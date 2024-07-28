import { BadRequestException } from '@nestjs/common';

export const isSuported = (mimetype: string) => {
  const suportedFiles = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'video/mp4',
    'application/ai',
    'image/svg',
    'application/postscript',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'audio/mpeg',
  ];

  if (!suportedFiles.includes(mimetype)) {
    throw new BadRequestException(['Tipo de arquivo não suportado']);
  }
};
