export type Experiencia = {
  titulo: string;
  subtitulo: string;
  descripcion: string[];
};

export type Proyecto = {
  titulo: string;
  subtitulo: string;
  descripcion: string[];
  repoLink: string[];
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
