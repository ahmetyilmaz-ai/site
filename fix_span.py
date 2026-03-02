import re
import os

filepath = r"c:\Ahmet\websitesi vibecoding\durumcu websitesi\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Change İncele span to an a tag with href to menu search
def replace_button(match):
    name = match.group(1)
    return match.group(0).replace('<span class="btn btn-outline">İncele</span>', f'<a href="menu.html?search={name}" class="btn btn-outline">İncele</a>')

text = re.sub(r'<h3 class="card-title">(.*?)</h3>.*?<span class="btn btn-outline">İncele</span>', replace_button, text, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
print("Done")
