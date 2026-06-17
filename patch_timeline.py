import codecs

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_line = "        { year: '2025-2026', title: 'Technical Lead', category: 'Experience', desc: 'VishwaShauryam, VIT Pune', icon: '\U0001f680' },"
new_lines = "        { year: '2025-2026', title: 'Technical Lead', category: 'Experience', desc: 'VishwaShauryam, VIT Pune', icon: '\U0001f680' },\n        { year: 'Jun 2026 - Present', title: 'Data Engineering Intern', category: 'Experience', desc: 'eInfochips (An Arrow Company)', icon: '\U0001f4bc' },"

if old_line in content:
    content = content.replace(old_line, new_lines)
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Success: inserted Data Engineering Intern into timeline!')
else:
    # Try raw bytes approach
    with open('App.tsx', 'rb') as f:
        raw = f.read()
    
    # Try to find and replace with raw bytes
    search_bytes = "        { year: '2025-2026', title: 'Technical Lead', category: 'Experience', desc: 'VishwaShauryam, VIT Pune', icon: '".encode('utf-8')
    
    idx = raw.find(search_bytes)
    if idx >= 0:
        print(f'Found search at byte offset {idx}')
        print(f'Surrounding bytes: {raw[idx:idx+len(search_bytes)+20].hex()}')
    else:
        print('Could not find search string in raw bytes either')
        # Show hex around area of interest
        for line in content.split('\n'):
            if 'Technical Lead' in line:
                print(f'Line found: {repr(line)}')
                print(f'Line bytes: {line.encode("utf-8").hex()}')