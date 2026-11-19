import { NextRequest, NextResponse } from 'next/server';
import { getFounders, addFounder } from '@/lib/founders';
import { isAuthorizedAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('all') === 'true';

    const founders = await getFounders({ includeUnpublished });
    return NextResponse.json({ founders });
  } catch (error) {
    console.error('API /api/founders GET error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve founders list' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Enforce administrative authorization
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication token required' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body.name || !body.designation) {
      return NextResponse.json(
        { error: 'Name and designation are required fields' },
        { status: 400 }
      );
    }

    const created = await addFounder({
      name: body.name,
      designation: body.designation,
      portrait_image: body.portrait_image || '/uploads/founders/ankit-portrait.png',
      signature_image: body.signature_image || '/uploads/founders/ankit-signature.png',
      short_description: body.short_description || body.short_intro || '',
      short_intro: body.short_intro || body.short_description || '',
      biography: body.biography || '',
      achievements: Array.isArray(body.achievements) ? body.achievements : [],
      personal_vision: body.personal_vision || '',
      display_order: typeof body.display_order === 'number' ? body.display_order : 99,
      is_published: body.is_published !== undefined ? Boolean(body.is_published) : true,
    });

    return NextResponse.json({ founder: created }, { status: 201 });
  } catch (error) {
    console.error('API /api/founders POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create founder profile' },
      { status: 500 }
    );
  }
}

