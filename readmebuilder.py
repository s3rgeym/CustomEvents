import os
import re

FILENAME = "README.md"


def build(filename):
    with open(filename, encoding="utf-8") as fp:
        content = fp.read()
    out = []
    matches = re.findall(r"/\*\*\s+([\s\S]+?)\s+\*/\s+(.*function[^{]+)",
                         content)
    re_asterisk = re.compile(r'^[ \t]*\* ?', re.M)
    re_at = re.compile(r'^@', re.M)
    for match in matches:
        description = re_asterisk.sub('', match[0])
        description = re_at.sub('<br>&#64;', description)
        function = match[1].strip()
        function += " {}"
        out.append("```javascript\n" + function + "\n```\n")
        out.append(description)
        out.append("")
    content = "\n".join(out)
    content = re.sub(r"<code>\s*([\s\S]+?)\s*</code>",
                     "```javascript\n\\1\n```",
                     content)
    with open(FILENAME, "w", encoding="utf-8") as fp:
        fp.write(content)
