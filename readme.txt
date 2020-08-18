 Прищлось добавить несколько строчек в package.json

{
  ......
  "scripts": {
    ......
    "preinstall": "npx npm-force-resolutions"
  },
  "resolutions": {
    "graceful-fs": "4.2.4"
  }
}

Без них не запускалось.