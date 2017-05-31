export default {
  t(key) {
    if (!key) { return ''; }

    const slices = key.split('::');
    return slices[slices.length - 1].replace(/^:/, '');
  }
};
