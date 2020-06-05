# gdy-rrweb-plugin

An automated capture reporting tool based on the RRweb open-source project

Matching server-side: [https://github.com/corcd/rrweb-server]()

## Install

### NPM

```bash
npm install gdy-rrweb-plugin --save
yarn add gdy-rrweb-plugin
```

```javascript
import RRgdy from 'gdy-rrweb-plugin'
```

### Resource

1. Download `dist/gdy-rrweb.min.js` to location
2. Use `script` to import file

```html
<html>
<head>
  <meta charset="UTF-8">
  <title>report test</title>
  <script src="../dist/gdy-rrweb.min.js"></script>
</head>
```

## Usage

```javascript
import RRgdy from 'gdy-rrweb-plugin'

const rrgdy = new RRgdy(uin, 'xxxx', 'url')
```

### record

```javascript
rrgdy.record()
```

### stop

```javascript
rrgdy.stop()
```

### export

```javascript
rrgdy.export('url')
```

### restore

```javascript
rrgdy.restore('binaryString')
```

### replay

```javascript
rrgdy.replay()
```

## License

ISC
