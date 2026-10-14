// MAPONTES FPS - catálogo da nova campanha pós-apocalíptica.
// Etapa 1: dados declarativos. Nenhum comportamento do jogo atual é alterado.
// Integração com spawn, HUD e carregamento de mapas será feita em etapas,
// depois de validar as dependências existentes em jogo-principal.js.
export const CLASSES_INIMIGOS = Object.freeze({
  CIVIL: "civil",
  GANGUE: "gangue",
  MILITAR: "militar",
  EXTRATERRESTRE: "extraterrestre",
});

export const MAPAS_CAMPANHA = Object.freeze([
  {
    id: 1,
    slug: "condominio-urbano",
    nome: "Cidade Urbana — Condomínio",
    ambiente: "urbano-residencial",
    classesInimigos: [CLASSES_INIMIGOS.CIVIL],
    narrativa: "Sobrevivência no condomínio depois do colapso.",
  },
  {
    id: 2,
    slug: "cidade-industrial",
    nome: "Cidade Industrial",
    ambiente: "urbano-industrial",
    classesInimigos: [CLASSES_INIMIGOS.CIVIL, CLASSES_INIMIGOS.GANGUE],
    narrativa: "Disputa por recursos e territórios industriais.",
  },
  {
    id: 3,
    slug: "aeroporto",
    nome: "Aeroporto",
    ambiente: "aeroportuario",
    classesInimigos: [CLASSES_INIMIGOS.GANGUE, CLASSES_INIMIGOS.MILITAR],
    narrativa: "Área estratégica disputada por gangues e militares.",
  },
  {
    id: 4,
    slug: "floresta-portal",
    nome: "Floresta — Portal Interplanetário",
    ambiente: "florestal-anomalo",
    classesInimigos: [CLASSES_INIMIGOS.MILITAR, CLASSES_INIMIGOS.EXTRATERRESTRE],
    narrativa: "Avanço pela floresta até um portal para outro mundo.",
  },
]);

export const ARMAS_POR_CLASSE = Object.freeze({
  [CLASSES_INIMIGOS.CIVIL]: ["taco", "bastao"],
  [CLASSES_INIMIGOS.GANGUE]: ["faca", "revolver"],
  [CLASSES_INIMIGOS.MILITAR]: ["pistola", "arma-automatica"],
  [CLASSES_INIMIGOS.EXTRATERRESTRE]: [], // Definir por criatura/modelo Tripo3D.
});

export function obterMapaCampanha(id) {
  return MAPAS_CAMPANHA.find(mapa => mapa.id === Number(id)) ?? null;
}

export function classePermitidaNoMapa(idMapa, classe) {
  const mapa = obterMapaCampanha(idMapa);
  return Boolean(mapa && mapa.classesInimigos.includes(classe));
}
