//multer-config.ts

import * as path from 'path';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const s3Config = new S3Client({
  region: configService.get<string>('REGION'), //região selecionada na criação do bucket
  credentials: {
    accessKeyId: configService.get<string>('ACCESS_KEY_ID'), //chave de acesso
    secretAccessKey: configService.get<string>('SECRET_ACCESS_KEY'), //chave de acesso secreta
  },
});

const multerConfig = {
  storage: multerS3({
    s3: s3Config,
    bucket: configService.get<string>('BUCKET'),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
