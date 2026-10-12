from pathlib import Path

p = Path("jogo-principal.js")
s = p.read_text(encoding="utf-8")

def trocar(antes, depois):
    global s
    n=s.count(antes)
    if n!=1:
        raise RuntimeError(f"ETAPA 358 abortada: trecho esperado ocorreu {n} vezes: {antes[:95]}")
    s=s.replace(antes,depois,1)

# A luz real e o cone visual possuem callbacks separados.
trocar("faseMapa214 === 2 && lanternaLigada339 && scene.activeCamera === camera",
      "faseMapa214 === 2 && lanternaLigada339 && !curando && scene.activeCamera === camera")
trocar("faseMapa214 === 2 && lanternaLigada339 && scene.activeCamera === camera",
      "faseMapa214 === 2 && lanternaLigada339 && !curando && scene.activeCamera === camera")

# Visao dos inimigos precisa respeitar o estado da lanterna durante a cura.
trocar("if (lanternaLigada339 && distanciaJogador <= 17 && scene.activeCamera === camera) {",
      "if (lanternaLigada339 && !curando && distanciaJogador <= 17 && scene.activeCamera === camera) {")

# De oito barreiras/cercas internas para quatro, conservando muros do perimetro.
trocar("""  const posicoesCercas299 = [
    [-9.1, -8, 0.3],
    [-5.5, -11, 1.8],
    [8.7, -8.1, 2.6],
    [5.6, -4.8, 0.85],
    [-8.7, 2.5, 2.1],
    [8.5, 6.2, 0.45],
    [-4.7, 9.4, 1.35],
    [4.5, 11, 2.95]
  ];""",
"""  // ETAPA 358: apenas quatro cercas internas no Mapa 2.
  const posicoesCercas299 = [
    [-9.1, -8, 0.3],
    [8.7, -8.1, 2.6],
    [-8.7, 2.5, 2.1],
    [4.5, 11, 2.95]
  ];""")

# Uma verificacao adicional, sem alterar a logica do jogador.
if s.count("&& !curando && scene.activeCamera === camera") != 2:
    raise RuntimeError("Lanterna e feixe nao foram sincronizados")
if s.count("const posicoesCercas299 = [")!=1:
    raise RuntimeError("Array de cercas nao identificado")
p.write_text(s,encoding="utf-8")
print("ETAPA 358: lanterna e feixe apagados durante seringa; 4 cercas internas no mapa 2.")
