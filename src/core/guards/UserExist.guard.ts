import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class UserExistGuard implements CanActivate {
    constructor(private readonly userService: UsersService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const { nip, email } = request.body;

        // Cari pengguna berdasarkan NIP
        const userByNip = await this.userService.findOneById(nip);

        if (userByNip) {
            throw new ForbiddenException('This NIP already exists');
        }

        // Cari pengguna berdasarkan email
        const userByEmail = await this.userService.findOneByEmail(email);

        if (userByEmail) {
            throw new ForbiddenException('This email already exists');
        }

        return true;
    }
}
