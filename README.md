[![npm](https://img.shields.io/npm/dt/useful-decorator.svg)]()

# Useful Decorators For Optimization API Response

## Installation

```js
npm install useful-decorator
yarn add useful-decorator
```

## Usage

`@data` - Make that class a data class.

`@field` - Maps the values ​​of incoming API response. (Must be a data class.)

```js

// BoardItem.js

import {data, field} from 'useful-decorator';
import * as pp from './preprocess';

@data
class BoardItem {
  // response.articleId -> preprocess -> store into 'id'
  @field('articleId', pp.number)
  id;
  @field('writer')
  writer;
  @field('boardTitle', pp.title)
  title;
  @field('likeCount', pp.number)
  likeCount;
  @field('readCount', pp.number)
  viewCount;
  @field('regDate', pp.date)
  regDate;
  @field('regDate', pp.dateTime)
  regDateTime;
  @field('regDate')
  rawDateTime;
  @field('redirectURL')
  redirectURL;
  @field('thumbnailURL', pp.thumbnailURL)
  thumbnailURL;
  @field('isEnd', pp.isClosed)
  isClosed;
  @field('boardTitle', pp.isRegular)
  isRegular;
  @field('thumbnailURL', pp.isThumbnail)
  isThumbnail;
  @field('boardtags')
  tags;
  @field('unauthorized')
  needAuth;
}

export default BoardItem;

// preprocess.js

import { convertStringsToRegExp } from '@/service/domain.utils';

export function number(value) {
  return parseInt(value);
}

export function title(title) {
  return title.replace(UselessWordsRegex, '');
}

export function date(value) {
  return value.slice(0, 11);
}

export function dateTime(value) {
  return new Date(value);
}

export function thumbnailURL(value) {
  return typeof value === 'string'
    ? value.replace('f100_100', 'f200_200')
    : value;
}

export function isThumbnail(value) {
  return typeof value === 'string' && value.length > 0;
}

export function isClosed(value) {
  return value === END_FLAG;
}
...
```

`@select` - Converts the API result value into a registered function and returns it.

```js
import {select} from 'useful-decorator';
import {Offer} from '@/service/offer';
import HttpClient from './http-client';

class OfferClient extends HttpClient {
  @select(typeOfferArray)
  async recent() {
    return await this.get('/board');
  }
}

function typeOfferArray(values) {
  return values.map(Offer);
}

export default OfferClient;
```

## License

MIT
