with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

search_str = "        { year: '2025-2026', title: 'Technical Lead', category: 'Experience', desc: 'VishwaShauryam, VIT Pune', icon: '🚀' },"
new_line = "        { year: 'Jun 2026 - Present', title: 'Data Engineering Intern', category: 'Experience', desc: 'eInfochips (An Arrow Company)', icon: '💼' },"

new_content = content.replace(search_str, search_str + '\n' + new_line)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done inserting Data Engineering Intern entry')