import { DemoId } from './demos.config';

export function getDemoFontClass(id: DemoId): string {
  switch (id) {
    case 'salon':
      return 'font-serif';
    case 'jewellery':
      return 'font-serif';
    case 'clinic':
      return 'font-sans';
    case 'restaurant':
      return 'font-serif';
    case 'gym':
      return 'font-sans';
    case 'shop':
      return 'font-sans';
    case 'classes':
      return 'font-sans';
    case 'general':
    default:
      return 'font-sans';
  }
}

