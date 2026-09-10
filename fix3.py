import os
import re

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# CommentTree.tsx
fix_file('./frontend/src/components/CommentTree.tsx', [
    ('addCommentToTranscriptAtom,\n', ''),
    ('const result = await response.json();\n', '')
])

# Header.tsx
with open('./frontend/src/components/Header.tsx', 'r', encoding='utf-8') as f:
    header = f.read()
header = re.sub(r'import debateAiLogo from .*?;?\n', '', header)
with open('./frontend/src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(header)

# Home.tsx
with open('./frontend/src/Pages/Home.tsx', 'r', encoding='utf-8') as f:
    home = f.read()
home = re.sub(r'import ClashMindsLogo from .*?;?\n', '', home)
with open('./frontend/src/Pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(home)

# Profile.tsx
fix_file('./frontend/src/Pages/Profile.tsx', [
    ('const handleProfileAvatarLoadError = () => {\n    setProfileAvatarError(true);\n  };', '')
])

# Game.tsx
fix_file('./frontend/src/Pages/Game.tsx', [
    ('const lastTypingStateRef = useRef(false);', ''),
    ('const lastSpeakingStateRef = useRef(false);', ''),
    ('const sendWebSocketMessage = useCallback((action: string, payload: any) => {\n    if (wsRef.current?.readyState === WebSocket.OPEN) {\n      wsRef.current.send(JSON.stringify({ action, ...payload }));\n    }\n  }, []);', ''),
    ('points: boolean;', 'points: number;')
])

# TeamDebateRoom.tsx
with open('./frontend/src/Pages/TeamDebateRoom.tsx', 'r', encoding='utf-8') as f:
    tdr = f.read()
tdr = tdr.replace('currentTranscript,\n', '')
tdr = tdr.replace('myTeamIdRef.current = myTeamId;', 'myTeamIdRef.current = myTeamId || null;')
tdr = tdr.replace('myTeamIdRef.current = myTeamId || null || null;', 'myTeamIdRef.current = myTeamId || null;')
with open('./frontend/src/Pages/TeamDebateRoom.tsx', 'w', encoding='utf-8') as f:
    f.write(tdr)

# teamDebateService.ts
fix_file('./frontend/src/services/teamDebateService.ts', [
    ('TeamTeamMatchmakingPoolResponse', 'TeamMatchmakingPoolResponse')
])
