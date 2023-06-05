import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // handleRequest(err: any, user: any, info: any, context: any, status: any) {
  //   const request = context.switchToHttp().getRequest();
  //   Logger.log('LocalAuthGuard');
  //   Logger.log(user);
  //   Logger.log(info);
  //   Logger.log(context);
  //   Logger.log(status);
  //   Logger.log(err);
  //   Logger.log(request.body);
  //   if (err || !user) {
  //     throw err || new Error('User not found');
  //   }
  //   return user;
  //
  // }
}

