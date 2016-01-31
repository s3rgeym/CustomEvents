if __name__ == "__main__":
    import re
    with open("events.js", encoding="utf-8") as fp:
        content = fp.read()
    matches = re.findall(r"/\*\*\s*([\s\S]+?)\s*\*/", content)
    out = []
    for match in matches:
        lines = match.splitlines()
        for line in lines:
            line = re.sub("^ *\* ?", "", line.rstrip())
            line = re.sub("^@", "* ", line)
            out.append(line)
        out.append('')
    content = "\n".join(out)
    content = re.sub(r"<code>\s*([\s\S]+?)\s*</code>\s?",
                     "```javascript\n\\1\n```\n",
                     content)
    with open("README.md", "w", encoding="utf-8") as fp:
        fp.write(content)
