import format from './dist/format-results.js';

export default function formatter(results) {
  return format(results, process.env);
}
