import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ProfilePermissions } from '../profile-permissions';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(requiredPermissions);

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();

    console.log(request, 'requiredPermissions');

    const user = request.users;

    console.log(user, 'sss');

    const userId = user.id; // we make sure we have the userProfileId

    // We obtain the user profile from the userProfileId
    const userRole = await this.usersService.findOne(userId);

    if (!userRole) {
      throw new ForbiddenException('');
    }

    const role = userRole.role; //Get the profileCode of the profile

    const userPermissions = ProfilePermissions[role] || [];

    const hasPermission = requiredPermissions.every((p) =>
      userPermissions.includes(p),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'this.globalTexts.youDoNotHavePermissionForThisAction',
      );
    }

    return true;
  }
}
