import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DatabaseModule, UserModule, AuthModule, CategoriesModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({path:'*' , method:RequestMethod.ALL});
  }
}
