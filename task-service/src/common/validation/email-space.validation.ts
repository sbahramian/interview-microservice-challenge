import { ValidationOptions, registerDecorator } from 'class-validator';

export function NoSpacesInEmail(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'noSpacesInEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any) {
          if (typeof value === 'string' && value.includes(' ')) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
