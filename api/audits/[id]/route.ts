import { NextResponse } from 'next/server';
import { getAuditById } from 'lib/audit-data'; // Importamos la función compartida

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const audit = getAuditById(id); // La llamamos directamente

  if (!audit) {
    return NextResponse.json({ message: 'Audit not found' }, { status: 404 });
  }

  return NextResponse.json(audit);
}