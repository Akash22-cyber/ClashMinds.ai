import os

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix CORS in backend main.go
fix_file('./backend/cmd/server/main.go', [
    ('AllowOrigins:     []string{"http://localhost:5173"},', 'AllowOrigins:     []string{"http://localhost:5173", "https://clash-minds-ai.vercel.app"},')
])

# Fix Google Sign-In width
fix_file('./frontend/src/Pages/Authentication/forms.tsx', [
    ('width: \'100%\',', '')
])

# Fix React Router warnings
fix_file('./frontend/src/main.tsx', [
    ('<BrowserRouter>', '<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>')
])
