function getArticleStatusTitle(status) {
  const statusMap = {
    DRAFT: 'Черновик',
    SENT: 'Отправлена',
    PRELIMINARY_REVISION: 'Требует предварительной доработки',
    SENT_AFTER_REVISION: 'Отправлена после предварительной доработки',
    AWAIT_REVIEWER: 'Ожидает подтверждения рецензента',
    AWAIT_REVIEW: 'Ожидает рецензирования',
    AWAIT_REDACTOR: 'Ожидает решения Редактора',
    REVISION: 'Рецензирование завершено, требует доработки',
    MODIFIED: 'Доработана',
    AWAIT_PAYMENT: 'Ожидает оплаты',
    AWAIT_PROOFREADING: 'Ожидает вычитки',
    AWAIT_TRANSLATE: 'Ожидает перевода',
    AWAIT_PUBLICATION: 'Ожидает публикации',
    PUBLISHED: 'Опубликована',
    DISAPPROVED: 'Отклонена',
    CALL_OFF: 'Отозвана',
    DELETE: 'Удалена'
  };

  return statusMap[status];
}

export default getArticleStatusTitle;
