from pathlib import Path
import json
import re

pagina = Path("index.html")
html = pagina.read_text(encoding="utf-8")
match = re.search(r'    const code = (".*");', html)
if not match:
    raise RuntimeError("Bundle embutido nao identificado; nenhum arquivo foi alterado.")

js = json.loads(match.group(1))

# O index atual ja possui o drop da etapa 355; nao reescrever sua logica.
exigidos = (
    "chanceDropAmpulheta355",
    "maximoAmpulhetasNoChao355",
    "function criarDespertadorMapa179(posicaoDrop355",
    "eliminacoes++",
)
ausentes = [termo for termo in exigidos if termo not in js]
if ausentes:
    raise RuntimeError("ETAPA 355 incompleta, faltam: " + ", ".join(ausentes))
if "proximoSpawnDespertador179" in js or "intervaloSpawnDespertador200" in js:
    raise RuntimeError("Spawn automatico antigo ainda presente. Abortando para preservar o jogo.")
if js.count("chanceDropAmpulheta355") < 2:
    raise RuntimeError("Chance de drop sem uso comprovado. Abortando.")

Path("jogo-principal.js").write_text(js, encoding="utf-8")
substituicao = '''    // ETAPA 355: codigo integral separado, sem alterar a logica do jogo.
    const respostaCodigo = await fetch("./jogo-principal.js?v=355", { cache: "no-store" });
    if (!respostaCodigo.ok) throw new Error("Falha ao carregar jogo-principal.js: HTTP " + respostaCodigo.status);
    const code = await respostaCodigo.text();'''
novo_html = html[:match.start()] + substituicao + html[match.end():]
pagina.write_text(novo_html, encoding="utf-8")
print("OK: HTML", len(novo_html), "caracteres; JS", len(js), "caracteres. ETAPA 355 preservada.")
