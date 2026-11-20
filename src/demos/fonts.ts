import { DemoId } from './demos.config';

export function getDemoFontClass(id: DemoId): string {
  switch (id) {
    case 'salon':
      return 'font-serif';
    case 'clinic':
      return 'font-sans';
    case 'restaurant':
      return 'font-serif';
    default:
      return 'font-sans';
  }
}
