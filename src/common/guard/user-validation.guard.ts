import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/app/user.service';

@Injectable()
export class UserValidationGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;

    const userExists = await this.userService.userExists(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return true;
  }
}
