import { z } from 'zod';

const optionalString = (min: number, max: number, label: string) =>
  z.preprocess(
    (val) => (typeof val === 'string' && val === '' ? undefined : val),
    z
      .string()
      .min(min, `${label} must be at least ${min} characters`)
      .max(max, `${label} is too long`)
      .optional()
  );

export const profileDataSchema = z.object({
  name: optionalString(2, 50, 'Name'),
  title: optionalString(2, 50, 'Title'),
  place: optionalString(2, 50, 'Place'),
  state: optionalString(2, 50, 'State'),
  country: optionalString(2, 50, 'Country'),
});
