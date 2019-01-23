export const stageMap = {
  DRAFT: 'Черновик',
  SENT: 'Отправлена',
  REVISION: 'На рецензировании',
  EDITING: 'Редактирование и верстка',
  AWAIT_PUBLICATION: 'Ожидает публикации',
  PUBLISHED: 'Опубликована',
  DISAPPROVED: 'Отклонена',
  CALL_OFF: 'Отозвана',
};

export const articleStageOptions = Object.keys(stageMap).map(key => ({ label: stageMap[key], value: key }));

export function getArticleStageTitle(stage) {
  return stageMap[stage] || stage;
}
