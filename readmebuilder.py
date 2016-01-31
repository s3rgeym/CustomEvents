import os
import re

FILENAME = "README.md"


def build(filename):
    with open(filename, encoding="utf-8") as fp:
        content = fp.read()
    matches = re.findall(r"/\*\*\s*([\s\S]+?)\s*\*/", content)
    out = [
        'Generated from source file: {}'.format(os.path.basename(filename)),
        ''
    ]
    re_asterisk = re.compile(r'^[ \t]*\* ?', re.M)
    re_at = re.compile(r'^@', re.M)
    for match in matches:
        match = re_asterisk.sub('', match)
        match = re_at.sub(' * ', match)
        out.append(match)
        out.append('')
    content = "\n".join(out)
    content = re.sub(r"<code>\s*([\s\S]+?)\s*</code>",
                     "```javascript\n\\1\n```",
                     content)
    with open(FILENAME, "w", encoding="utf-8") as fp:
        fp.write(content)
