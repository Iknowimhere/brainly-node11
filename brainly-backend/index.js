// const { createHmac } = require('node:crypto');
import {createHmac} from 'crypto'

const secret = 'tommy';
const hash = createHmac('sha256', secret)
               .update('password123')
               .digest('hex');
console.log(hash);