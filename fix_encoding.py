with open('App.tsx', 'rb') as f:
    raw = f.read()

# Fix double-encoded em dash
raw = raw.replace(b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9c', b'\xe2\x80\x94')
raw = raw.replace(b'\xc3\xa2\xe2\x82\xac\xe2\x80\x93', b'\xe2\x80\x93')
raw = raw.replace(b'\xc3\xa2\xe2\x82\xac\xe2\x80\x99', b'\xe2\x80\x99')

with open('App.tsx', 'wb') as f:
    f.write(raw)
print('Fixed remaining encoding issues')
