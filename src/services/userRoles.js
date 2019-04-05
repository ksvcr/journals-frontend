export const roleMap = {
  AUTHOR: 'Автор',
  REVIEWER: 'Рецензент',
  CORRECTOR: 'Корректор',
  TRANSLATOR: 'Переводчик',
  REDACTOR: 'Редактор'
};

export const fromRoleMap = {
  AUTHOR: 'От автора',
  REVIEWER: 'От рецензента',
  CORRECTOR: 'От корректора',
  TRANSLATOR: 'От переводчика',
  REDACTOR: 'От редактора'
};

export const toRoleMap = {
  AUTHOR: 'Автору',
  REVIEWER: 'Рецензенту',
  CORRECTOR: 'Корректору',
  TRANSLATOR: 'Переводчику',
  REDACTOR: 'Редактору'
};

export function getUserRoleTitle(role, type='default') {
  const map = {
    default: roleMap,
    from: fromRoleMap,
    to: toRoleMap
  };
  return map[type][role] || role;
}
