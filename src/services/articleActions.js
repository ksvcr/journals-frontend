export const actionsMap = {
  CREATE: 'Создана',
  EDIT: 'Отредактирована',
  VIEW: 'Просмотрена',
  DELETE: 'Удалена',
  SEND: 'Отправлена',
  CALL_OFF: 'Отозвана',
  APPOINT_REVIEWER: 'Назначен рецензент',
  ACCEPT_ARTICLE: 'Принята',
  DECLINE_ARTICLE: 'Отклонена',
  SEND_REVISION: 'Отправлена на доработку',
  ACCEPT_INVITATION: 'Принято приглашение на рецензирование',
  DECLINE_INVITATION: 'Отклонено приглашение на рецензирование',
  WRITE_REVIEW: 'Написана рецензция',
  READ_REVIEW: 'Прочитана рецензия',
  VIEW_HISTORY: 'Просмотрена история',
  PAY: 'Оплачена',
  CORRECT: 'Откорректирована',
  TRANSLATE: 'Переведена',
};


export function getArticleActionTitle(action) {
  return actionsMap[action] || action;
}
