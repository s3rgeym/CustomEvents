import urllib.parse
import urllib.request
import os


def minify(src, dst=None):
    with open(src, encoding='utf-8') as fp:
        data = fp.read()
    opener = urllib.request.build_opener(urllib.request.ProxyHandler())
    data = urllib.parse.urlencode({'input': data}).encode('ascii')
    response = opener.open('https://javascript-minifier.com/raw', data)
    data = response.read()
    if not dst:
        name, extension = os.path.splitext(src)
        dst = '{}.min{}'.format(name, extension)
    with open(dst, 'wb') as fp:
        fp.write(data)
