export function serializeArticleData(data) {
  const { authors, ...rest } = data;

  const serializedData = {
    ...rest,
    article_type: 1,
    slug: `slug-${new Date().getTime()}`,
    state_article: 'DRAFT',
    author: authors.find(author => author.isCurrent).id,
    collaborators: authors.filter(author => !author.isCurrent).map(author => author.id)
  };

  return serializedData;
}
