export function serializeArticleData(data) {
  const { authors, ...rest } = data;

  const serializedData = {
    ...rest,
    article_type: 1,
    slug: `slug-${new Date().getTime()}`,
    state_article: 'DRAFT'
  };

  const author = authors.find(author => author.id !== undefined);

  if (author) {
    serializedData.author = author.id;
  }

  const collaborators = authors
                        .filter(author => author.id !== undefined && author.id !== serializedData.author)
                        .map(author => author.id);

  if (collaborators.length) {
    serializedData.collaborators = collaborators;
  }

  return serializedData;
}
