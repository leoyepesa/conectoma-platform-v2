// Supabase Edge Function: send-submission-email
// Envía por correo el detalle de un artículo/póster postulado al editor en jefe.
// Usa Resend (https://resend.com) como proveedor de correo transaccional.
//
// Variables de entorno requeridas (configurar con `supabase secrets set`):
//   RESEND_API_KEY   -> API key de tu cuenta de Resend
//   EDITOR_EMAIL     -> correo del editor en jefe que recibirá el reenvío
//   FROM_EMAIL       -> remitente verificado en Resend (ej. no-reply@tudominio.com)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const EDITOR_EMAIL = Deno.env.get('EDITOR_EMAIL') ?? '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'no-reply@resend.dev';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const trackNames: Record<string, string> = {
  l1: 'Línea 1 · Sistemas Inteligentes y Transformación Digital',
  l2: 'Línea 2 · Infraestructura Sostenible y Territorio Inteligente',
  l3: 'Línea 3 · Manufactura Inteligente y Eficiencia Operacional',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY || !EDITOR_EMAIL) {
      throw new Error(
        'Faltan variables de entorno RESEND_API_KEY o EDITOR_EMAIL. Configúralas con `supabase secrets set`.'
      );
    }

    const { submissionId } = await req.json();
    if (!submissionId) throw new Error('Falta submissionId en el cuerpo de la solicitud.');

    // Verifica que quien llama esté autenticado y tenga rol admin/editor
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: userData, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    if (userError || !userData?.user) throw new Error('No autenticado.');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .single();

    if (!profile || !['admin', 'editor'].includes(profile.role)) {
      throw new Error('No tienes permisos para reenviar postulaciones.');
    }

    // Obtiene la postulación
    const { data: submission, error: subError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (subError || !submission) throw new Error('Postulación no encontrada.');

    const typeLabel = submission.type === 'articulo' ? 'Artículo' : 'Póster';
    const trackLabel = trackNames[submission.track] ?? submission.track;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#3A2FD8;">Nueva postulación · CONECTOMA IngenIA 2026</h2>
        <p><strong>Tipo:</strong> ${typeLabel}</p>
        <p><strong>Título:</strong> ${submission.title}</p>
        <p><strong>Autores:</strong> ${submission.authors}</p>
        <p><strong>Facultad / programa:</strong> ${submission.faculty}</p>
        <p><strong>Línea temática:</strong> ${trackLabel}</p>
        <p><strong>Resumen:</strong><br/>${submission.abstract}</p>
        ${submission.file_url ? `<p><strong>Documento:</strong> <a href="${submission.file_url}">${submission.file_url}</a></p>` : ''}
        <p><strong>Correo de contacto:</strong> ${submission.contact_email}</p>
        ${submission.contact_phone ? `<p><strong>Teléfono:</strong> ${submission.contact_phone}</p>` : ''}
        <p><strong>Estado actual:</strong> ${submission.status}</p>
        <p><strong>Recibido el:</strong> ${new Date(submission.created_at).toLocaleString('es-CO')}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color:#888; font-size: 12px;">
          Reenviado desde el panel administrativo de la plataforma IngenIA 2026.
        </p>
      </div>
    `;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [EDITOR_EMAIL],
        subject: `[IngenIA 2026] ${typeLabel} — ${submission.title}`,
        html,
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      throw new Error(`Error de Resend: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
