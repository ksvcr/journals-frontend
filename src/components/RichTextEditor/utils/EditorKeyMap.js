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

export const KEY_BACK_DELETE = makeKeyMapWithCommon('', 'Backspace');
export const KEY_FORWARD_DELETE = makeKeyMapWithCommon('', 'Delete');
export const KEY_INSERT_NEW_LINE = makeKeyMapWithCommon(
  'Insert new line',
  'Shift-Enter'
);
export const KEY_REDO = makeKeyMapWithCommon('Redo', 'Mod-Shift-z');

export const KEY_SHIFT_BACKSPACE = makeKeyMapWithCommon(
  'Shift Backspace',
  'Shift-Backspace'
);
export const KEY_TAB = makeKeyMapWithCommon('', 'Tab');
export const KEY_TAB_SHIFT = makeKeyMapWithCommon('', 'Shift-Tab');
export const KEY_TOGGLE_BOLD = makeKeyMapWithCommon('Toggle bold', 'Mod-b');
export const KEY_TOGGLE_HEADING_1 = makeKeyMap(
  'Heading 1',
  'Ctrl-1',
  'Cmd-Alt-1'
);
export const KEY_TOGGLE_HEADING_2 = makeKeyMap(
  'Heading 2',
  'Ctrl-2',
  'Cmd-Alt-2'
);
export const KEY_TOGGLE_HEADING_3 = makeKeyMap(
  'Heading 3',
  'Ctrl-3',
  'Cmd-Alt-3'
);
export const KEY_TOGGLE_HEADING_4 = makeKeyMap(
  'Heading 4',
  'Ctrl-4',
  'Cmd-Alt-4'
);
export const KEY_TOGGLE_HEADING_5 = makeKeyMap(
  'Heading 5',
  'Ctrl-5',
  'Cmd-Alt-5'
);
export const KEY_TOGGLE_HEADING_6 = makeKeyMap(
  'Heading 5',
  'Ctrl-6',
  'Cmd-Alt-6'
);
export const KEY_TOGGLE_ITALIC = makeKeyMapWithCommon('Toggle italic', 'Mod-i');
export const KEY_TOGGLE_STRIKETHROUGH = makeKeyMapWithCommon(
  'Toggle strikethrough',
  'Mod-Shift-s'
);
export const KEY_TOGGLE_UNDERLINE = makeKeyMapWithCommon(
  'Toggle underline',
  'Mod-u'
);
export const KEY_UNDO = makeKeyMapWithCommon('Undo', 'Mod-z');

export const ALL_KEYS = [
  KEY_INSERT_NEW_LINE,
  KEY_SHIFT_BACKSPACE,
  KEY_TAB_SHIFT,
  KEY_TAB,
  KEY_TOGGLE_BOLD,
  KEY_TOGGLE_HEADING_1,
  KEY_TOGGLE_HEADING_2,
  KEY_TOGGLE_HEADING_3,
  KEY_TOGGLE_HEADING_4,
  KEY_TOGGLE_HEADING_5,
  KEY_TOGGLE_HEADING_6,
  KEY_TOGGLE_ITALIC,
  KEY_TOGGLE_STRIKETHROUGH,
  KEY_TOGGLE_UNDERLINE,
  KEY_UNDO,
  KEY_REDO
];
