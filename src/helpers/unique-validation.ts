import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppDataSource } from '../data-source'; // adjust path to your data-source.ts

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const entity = (args.object as any)[`class_entity_${args.property}`];


    const repo = AppDataSource.getRepository(entity);
    const count = await repo.count({ where: { [args.property]: value } });
    return count < 1;
  }
}

export function UniqueOnDatabase(entity: Function, validationOptions?: ValidationOptions) {
  validationOptions = {
    message: '$value already exists. Choose another email or Log in.',
    ...validationOptions,
  };

  return function (object: Object, propertyName: string) {
    (object as any)[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
