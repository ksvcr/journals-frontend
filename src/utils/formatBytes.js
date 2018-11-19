function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Bytes';
  const k = 1000;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default formatBytes;
