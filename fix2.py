import os
import re

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('./frontend/src/Pages/TeamDebateRoom.tsx', [
    ('myTeamIdRef.current = myTeamId;', 'myTeamIdRef.current = myTeamId || null;'),
    ('const currentPhase = debatePhaseRef.current;', ''),
    ('liveTranscript={currentTranscript}', '')
])

fix_file('./frontend/src/components/CommentTree.tsx', [
    ('commentsByTranscriptAtom,', ''),
    ('const [, addCommentAtom] = useAtom(addCommentToTranscriptAtom(transcriptId));', ''),
    ('const newComment: Comment = result.comment;', '')
])
