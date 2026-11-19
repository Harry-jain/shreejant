import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { isAuthorizedAdmin } from '@/lib/auth';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB ceiling
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

export async function POST(request: NextRequest) {
  // 1. Authorization Guard
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication token required' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const rawType = formData.get('type') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. Strict file size verification (DoS protection)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit of 2MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File buffer exceeds maximum allowed limit of 2MB' },
        { status: 400 }
      );
    }

    // 3. Strict extension verification (Anti-XSS: disallow SVG and executable formats)
    const originalExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(originalExt)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Only PNG, JPG, JPEG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // 4. Sanitize type & generate unpredictable safe filename (Anti-Path-Traversal)
    const safeType = rawType === 'signature' ? 'signature' : 'portrait';
    const randomHex = crypto.randomBytes(8).toString('hex');
    const fileName = `${safeType}-${Date.now()}-${randomHex}${originalExt}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'founders');
    await fs.mkdir(uploadDir, { recursive: true });

    const targetFilePath = path.join(uploadDir, fileName);
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/uploads/founders/${fileName}`;
    return NextResponse.json({ url: publicUrl, fileName }, { status: 201 });
  } catch (error) {
    console.error('API /api/upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed. Ensure valid image format.' },
      { status: 500 }
    );
  }
}
