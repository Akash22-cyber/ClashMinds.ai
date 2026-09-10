import os

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('./frontend/src/Pages/StartDebate.tsx', [
    ('import ClashMindsLogo from \"@/assets/aossie.png\";\n', ''),
])

fix_file('./frontend/src/components/Footer.tsx', [
    ('import React from \'react\';\n', ''),
    ('import { Github, MessageCircle, Heart }', 'import { Github, Heart }'),
    ('import debateAiLogo from \'@/assets/aossie.png\';\n', '')
])

fix_file('./frontend/src/components/Header.tsx', [
    ('import debateAiLogo from \'@/assets/aossie.png\';\n', '')
])

fix_file('./frontend/src/components/Sidebar.tsx', [
    ('import debateAiLogo from \'@/assets/aossie.png\';\n', '')
])

fix_file('./frontend/src/services/teamDebateService.ts', [
    ('MatchmakingPoolResponse', 'TeamMatchmakingPoolResponse')
])
