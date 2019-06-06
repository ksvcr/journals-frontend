export function makeKeyMap(
  description,
  windows,
  mac,
  common
) {
  return {
    description,
    windows,
    mac,
    common
  };
}

export function makeKeyMapWithCommon(
  description,
  common
) {
  const windows = common.replace(/Mod/i, 'Ctrl');
  const mac = common.replace(/Mod/i, 'Cmd');
  return makeKeyMap(description, windows, mac, common);
}

export const KEY_REDO = makeKeyMapWithCommon('Redo', 'Mod-Shift-z');

export const KEY_SHIFT_BACKSPACE = makeKeyMapWithCommon(
  'Shift Backspace',
  'Shift-Backspace'
);
export const KEY_TAB = makeKeyMapWithCommon('', 'Tab');
export const KEY_TAB_SHIFT = makeKeyMapWithCommon('', 'Shift-Tab');
export const KEY_TOGGLE_BOLD = makeKeyMapWithCommon('Toggle bold', 'Mod-b');
export const KEY_TOGGLE_ITALIC = makeKeyMapWithCommon('Toggle italic', 'Mod-i');
export const KEY_UNDO = makeKeyMapWithCommon('Undo', 'Mod-z');

export const ALL_KEYS = [
  KEY_SHIFT_BACKSPACE,
  KEY_TAB_SHIFT,
  KEY_TAB,
  KEY_TOGGLE_BOLD,
  KEY_TOGGLE_ITALIC,
  KEY_UNDO,
  KEY_REDO
];
