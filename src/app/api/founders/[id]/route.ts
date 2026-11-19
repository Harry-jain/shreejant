import { NextRequest, NextResponse } from 'next/server';
import { getFounderById, updateFounder, deleteFounder } from '@/lib/founders';
import { isAuthorizedAdmin } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const founder = await getFounderById(id);
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    }
    return NextResponse.json({ founder });
  } catch (error) {
    console.error('API /api/founders/[id] GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication token required' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateFounder(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    }

    return NextResponse.json({ founder: updated });
  } catch (error) {
    console.error('API /api/founders/[id] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update founder profile' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication token required' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const success = await deleteFounder(id);
    if (!success) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Founder removed successfully' });
  } catch (error) {
    console.error('API /api/founders/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete founder' }, { status: 500 });
  }
}

