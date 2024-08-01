import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ObjectService } from './object/object.service';
import { ObjectModule } from './object/object.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ObjectModule,
    CategoryModule,
    SubcategoryModule,
    TagModule,
    CommentModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ObjectService],
})
export class AppModule {}
