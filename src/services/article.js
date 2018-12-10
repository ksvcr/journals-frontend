export function serializeArticleData(data = {}) {
  const { authors = [], has_financing, financing_sources, ...rest } = data;

  const serializedData = {
    ...rest,
    text_to_title: data.title,
    article_type: 1,
    slug: `slug-${new Date().getTime()}`
  };

  if (has_financing) {
    serializedData.financing_sources = financing_sources;
  }

  const author = authors.find(author => author.id !== undefined);

  if (author) {
    serializedData.author = { user: author.id };
  }

  const collaborators = authors
    .filter(author => author.id !== undefined && author.id !== serializedData.author.user)
    .map(author => ({ user: author.id }));

  if (collaborators.length) {
    serializedData.collaborators = collaborators;
  }

  serializedData.blocks = serializedData.blocks.map((item, index) => ({
    title: item.title,
    ordered: index,
    content_blocks: [{
      content: item.content,
      ordered: 0
    }]
  }));

  return serializedData;
}

export function deserializeArticleData(data = {}) {
  const { author, collaborators, ...rest } = data; 
  const deserializedData = rest;
  if (author && collaborators) {
    deserializedData.authors = [{
      id: author.user
    }, ...collaborators.map(item => ({ id: item.user }))];
  }
  return deserializedData;
}
