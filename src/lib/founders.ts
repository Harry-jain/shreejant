import fs from 'fs/promises';
import path from 'path';

export interface Founder {
  id: string;
  name: string;
  designation: string;
  portrait_image: string;
  signature_image: string;
  hook?: string;
  paragraphs?: string[];
  superpower?: string;
  weakness?: string;
  github?: string;
  short_description?: string;
  short_intro?: string;
  biography?: string;
  achievements?: string[];
  personal_vision?: string;
  display_order: number;
  is_published: boolean;
}

const FOUNDERS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'founders.json');

export async function getFounders(options: { includeUnpublished?: boolean } = {}): Promise<Founder[]> {
  try {
    const rawData = await fs.readFile(FOUNDERS_FILE_PATH, 'utf-8');
    const founders: Founder[] = JSON.parse(rawData);
    
    let filtered = options.includeUnpublished 
      ? founders 
      : founders.filter((f) => f.is_published);

    filtered.sort((a, b) => a.display_order - b.display_order);
    return filtered;
  } catch (error) {
    console.error('Error reading founders data:', error);
    return [];
  }
}

export async function getFounderById(id: string): Promise<Founder | null> {
  const founders = await getFounders({ includeUnpublished: true });
  return founders.find((f) => f.id === id) || null;
}

export async function saveFounders(founders: Founder[]): Promise<void> {
  founders.sort((a, b) => a.display_order - b.display_order);
  await fs.writeFile(FOUNDERS_FILE_PATH, JSON.stringify(founders, null, 2), 'utf-8');
}

export async function addFounder(newFounderData: Omit<Founder, 'id'> & { id?: string }): Promise<Founder> {
  const founders = await getFounders({ includeUnpublished: true });
  const slug = (newFounderData.id || newFounderData.name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const id = slug || `founder-${Date.now()}`;
  
  const created: Founder = {
    ...newFounderData,
    id,
    display_order: newFounderData.display_order ?? (founders.length + 1),
    is_published: newFounderData.is_published ?? true,
    achievements: newFounderData.achievements ?? [],
  };

  founders.push(created);
  await saveFounders(founders);
  return created;
}

export async function updateFounder(id: string, updates: Partial<Founder>): Promise<Founder | null> {
  const founders = await getFounders({ includeUnpublished: true });
  const index = founders.findIndex((f) => f.id === id);
  if (index === -1) return null;

  founders[index] = {
    ...founders[index],
    ...updates,
    id, // Keep original ID stable
  };

  await saveFounders(founders);
  return founders[index];
}

export async function deleteFounder(id: string): Promise<boolean> {
  const founders = await getFounders({ includeUnpublished: true });
  const filtered = founders.filter((f) => f.id !== id);
  if (filtered.length === founders.length) return false;

  await saveFounders(filtered);
  return true;
}

