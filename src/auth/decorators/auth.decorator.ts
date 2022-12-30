import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from './role-protected.decorator';

import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../dto/valid-roles.interface';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    
    RoleProtected(...roles),

    UseGuards(AuthGuard(), UserRoleGuard), 

  );
}
