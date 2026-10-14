# Plano técnico — MAPONTES TPS com câmera híbrida

## Status
**Planejamento, não implementação.** Não alterar `main`, `index.html` ou `jogo-principal.js` antes de auditar integralmente suas dependências. O arquivo principal tem aproximadamente 1,89 MB, e seu conteúdo completo não estava disponível para inspeção pelo conector. Inspeção parcial confirmou que `index.html` carrega `jogo-principal.js`, inicializa Babylon.js e invoca `createScene`; `mapas/cidade.js` e `mapas/campo.js` contêm configuração de colisões.

## Objetivo
Protagonista: Antônio, personagem estilizado com roupa fixa, rig humanoide Mixamo e modelo GLB (pendente de envio e verificação). Câmera de exploração atrás do personagem e relativamente afastada; segurar botão direito aproxima suavemente a câmera ao ombro para mirar; soltar volta à exploração.

## Auditoria obrigatória do código principal
Antes de qualquer patch encontrar e documentar:
1. Criação de `scene`, `camera`, `activeCamera`, inputs de teclado/mouse, pointer lock e eventos de canvas.
2. Deslocamento do jogador, velocidade, corrida, salto, gravidade, colisões, obstáculos e orientação visual.
3. Raycast/projéteis/disparo, ponto de origem das balas, recoil, mira, sensibilidade, armas e recarga.
4. Referências à câmera nos efeitos, lanterna, cura, interação, HUD, menus e mudança de mapa.
5. Controle dos inimigos, dano ao jogador, detecção/linha de visão, drops e morte.
6. IDs de mapas atuais e condições específicas de fase; script da etapa 358 menciona `scene.activeCamera === camera` e lanterna no mapa 2.
7. Integrações globais do Babylon.js e funções assíncronas carregadas por `index.html`.

## Etapas de implementação
### TPS-01 — Preparação e teste reversível
- Criar camada de configurações TPS separada, não importar até validar.
- Adicionar feature flag `modoTPS` inicialmente desligada para que FPS continue operacional.
- Importar Antônio GLB somente após validar escala, orientação, texturas, Skeleton/bones e AnimationGroups; não substituir imediatamente o antigo corpo/câmera.
- Validar animações `idle`, `walk`, `run`, ataque, dano, cura e morte; não pressupor nomes iguais aos rótulos no Tripo.

### TPS-02 — Movimento e câmera
- Definir alvo `cameraTarget` sobre peito/cabeça; controlar pivot/yaw/pitch separadamente do mesh visual.
- Interpolar offset/distância/FOV entre exploração (afastado, visual de corpo inteiro) e mira (over-the-shoulder), com limites configuráveis e interpolação usando delta time.
- Aplicar collision check por raycast entre alvo e câmera para impedir atravessar paredes; suavizar recuo da câmera.
- Preservar WASD/Shift/E/Espaço/menus atuais e impedir conflitos com pointer lock.
- Sincronizar orientação do personagem com movimentação (exploração) e direção da câmera (mira).

### TPS-03 — Armas e mira
- Prender armas a ossos/âncoras da mão; mão auxiliar por IK/ajuste local, se necessário.
- Raycast a partir da câmera/retículo determina o ponto pretendido; efetuar teste a partir do cano até o alvo para evitar disparos atravessando cobertura próxima.
- Evitar acertar o próprio personagem: excluir visual e collider apropriados do raycast.
- Preservar munição, recarga, dano, áudio e efeitos existentes; validar hip fire e ADS.

### TPS-04 — Integração com sistemas existentes
- Ajustar interações por distância do personagem ou raycast da câmera, conforme caso.
- Adaptar lanterna, seringa/cura, queda, HUD, indicadores de dano e apresentação de arma.
- Migrar mapa por mapa; não assumir que quatro cenas independentes já existem.
- Manter as rotinas de drops (inclusive ampulhetas) e comportamentos de IA sem alterações não necessárias.

### TPS-05 — Remoção do legado e otimização
- Desativar FPS padrão somente após testes e aprovação da câmera TPS.
- Remover assets/rotinas antigos em PR separado, após comprovação de ausência de referências.
- Testar consumo de memória, draw calls, animações simultâneas e FPS em navegador.

## Critérios de aceite
- Transição exploração ↔ mira sem saltos ou clipping.
- Movimento, corrida e mudança de direção coerentes; sem deslizamento exagerado.
- Personagem não bloqueia retículo nem a mira atinge seu próprio corpo.
- Disparos respeitam obstáculo entre cano e alvo.
- Cura, lanterna, inventário, HUD, munição, recarga, drops e mudanças de mapa continuam funcionando.
- Não há erros no console; rollback via flag permite reativar FPS enquanto migração estiver em teste.

## Dados pendentes
- GLB do Antônio exportado com esqueleto e animações, para verificar ossos e clips de verdade.
- Acesso legível ao arquivo `jogo-principal.js` completo ou cópia em partes para auditoria de trechos de câmera/controles.
