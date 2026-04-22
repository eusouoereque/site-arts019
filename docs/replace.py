import re

with open('E:/Material Paginas/Arts019/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<div class="image-before">\s*<span>(.*?)</span>\s*</div>', r'<div class="image-before"></div>\n                        <span class="label-before">\1</span>', content)
content = re.sub(r'<div class="image-after">\s*<span>(.*?)</span>\s*</div>', r'<div class="image-after"></div>\n                        <span class="label-after">\1</span>', content)

with open('E:/Material Paginas/Arts019/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
