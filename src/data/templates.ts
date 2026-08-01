export interface DocTemplate {
  id: string;
  label: string;
  description: string;
  fileName: string; // debe coincidir con el archivo real dentro de public/templates/
}

// Edita esta lista para agregar, quitar o renombrar plantillas.
// El archivo correspondiente debe existir en public/templates/<fileName>.
export const templates: DocTemplate[] = [
  {
    id: 'articulo',
    label: 'Plantilla de artículo (Word)',
    description: 'Formato oficial para la redacción de artículos, máx. 8 páginas.',
    fileName: 'plantilla-articulo.doc',
  },
  {
    id: 'poster',
    label: 'Plantilla de póster (PowerPoint)',
    description: 'Formato oficial 90x120 cm para pósters de investigación.',
    fileName: 'plantilla-poster.pptx',
  },
  {
    id: 'normas',
    label: 'Normas para autores (PDF)',
    description: 'Lineamientos de citación, estructura y criterios de evaluación.',
    fileName: 'normas-autor.pdf',
  },
];
