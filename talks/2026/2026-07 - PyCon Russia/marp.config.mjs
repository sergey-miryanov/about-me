import highlightLines from 'markdown-it-highlight-lines'

// Functional engine: extend Marp Core's markdown-it with line-highlight support.
// Enables ```c {2,9,15,16} fenced syntax; highlighted lines get class="highlighted-line".
// themeSet registers the shared gruvbox theme used by both language decks (theme: gc-talk).
export default {
  themeSet: ['./themes/gc-talk.css'],
  engine: ({ marp }) => marp.use(highlightLines),
}
