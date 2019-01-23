export const roleMap = {
  AUTHOR: 'Автор',
  REVIEWER: 'Рецензент',
  CORRECTOR: 'Корректор',
  TRANSLATOR: 'Переводчик',
  REDACTOR: 'Редактор'
};

export function getUserRoleTitle(role) {
  return roleMap[role] || role;
}
