import { format } from './dist/format-results.js';

export default function formatter(results) {
  console.log(format(results, process.env));
}
