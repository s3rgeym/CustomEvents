if __name__ == "__main__":
    import re
    with open("events.js", encoding="utf-8") as fp:
        content = fp.read()
    matches = re.findall(r"/\*\*\s*([\s\S]+?)\*/", content)
    out = []
    for match in matches:
        lines = match.splitlines()
        for line in lines:
            out.append(re.sub("^ *\* ?", "", line))
    content = "\n".join(out)
    content = re.sub("@(\w+)", "\\1:", content)
    content = content.replace("author:", "Author:")
    content = re.sub("Usage:([\s\S]+?)\n\n", "\n```javascript\\1\n```\n\n",
                     content)
    with open("README.md", "w", encoding="utf-8") as fp:
        fp.write(content)
