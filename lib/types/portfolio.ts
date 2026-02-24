export type Experiencia = {
  fechaInicio?: string | null;
  fechaFin?: string | null;
  titulo: string;
  subtitulo: string;
  descripcion: string[];
};

export type Proyecto = {
  date?: string | null;
  titulo: string;
  subtitulo: string;
  descripcion: string[];
  repoLink: string[];
  images: string[];
};

export type Trabajo = {
  experiencia: Experiencia[];
  proyectos: Proyecto[];
};

export type SobreMi = {
  paragraphs: string[];
  redes: {
    instagram: string;
    linkedin: string;
    github: string;
  };
};
