export default function getFileExtension (filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : null;
}
