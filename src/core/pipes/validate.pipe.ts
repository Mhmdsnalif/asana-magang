import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../modules/users/user.dto';

@Injectable()
export class ValidateInputPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Input data tidak boleh kosong');
    }

    // Ubah data menjadi instance UserDto
    const userDto = plainToClass(UserDto, value);

    // Lakukan validasi dengan class-validator
    const errors = await validate(userDto);

    if (errors.length > 0) {
      const errorMessages = this.extractErrorMessages(errors);
      throw new BadRequestException({ message: 'Validasi input data gagal', errors: errorMessages });
    }

    return value;
  }

  private extractErrorMessages(errors) {
    const errorMessages = {};
    errors.forEach((error) => {
      const property = error.property;
      Object.entries(error.constraints).forEach(([constraint, message]) => {
        if (!errorMessages[property]) {
          errorMessages[property] = [];
        }
        errorMessages[property].push(message);
      });
    });
    return errorMessages;
  }
}
