export function serializeArticleData(data = {}) {
  const { authors = [], has_financing, has_printed, financing_sources, blocks, sources,
          file_atachments, use_address_from_profile, printed, ...rest } = data;

  const serializedData = {
    ...rest,
    text_to_title: data.title,
    article_type: 1
  };

  if (has_financing && financing_sources) {
    serializedData.financing_sources = financing_sources.filter(item => {
      return item.organization && item.grant_name && item.financing_id && item.grant_number;
    });

    if (!serializedData.financing_sources.length) {
      delete serializedData.financing_sources;
    }
  }

  if (has_printed) {
    if (use_address_from_profile) {
      serializedData.printed = [{ use_address_from_profile: true }];
    } else {
      serializedData.printed = printed;
    }
  }

  const author = authors.find(author => author.id !== undefined);

  if (author) {
    serializedData.author = { user: author.id };

    if(author.roles) {
      serializedData.author.roles = Object.keys(author.roles)
        .filter(key => author.roles[key])
        .map(role => role.split('-')[0]);
    }
  }

  const collaborators = authors
    .filter(author => author.id !== undefined && author.id !== serializedData.author.user)
    .map(author => {
      const collaborator = { user: author.id };
      if(author.roles) {
        collaborator.roles = Object.keys(author.roles)
          .filter(key => author.roles[key])
          .map(role => role.split('-')[0]);
      }

      return collaborator;
    });

  if (collaborators.length) {
    serializedData.collaborators = collaborators;
  }

  if (blocks) {
    serializedData.blocks = blocks.map((item, index) => ({
      title: item.title,
      ordered: index,
      content: item.content
    }));
  }

  if (file_atachments) {
    serializedData.file_atachments = file_atachments.map(item => {
      if (item.id !== undefined) {
        delete item.file;
      }
      return item
    });
  }

  if (sources) {
    serializedData.sources = sources.filter(item => item.resourcetype);
  }

  // Удаляем загруженные файлы, так как апи принимает только base64
  const fileKeys = ['incoming_file', 'list_literature_file'];

  fileKeys.forEach(key => {
    if (serializedData[key]) {
      const clearBase64 = serializedData[key].split(',')[1];
      if (!clearBase64 || (clearBase64 && !isBase64(clearBase64))) {
        delete serializedData[key];
      }
    }
  });

  return serializedData;
}

export function deserializeArticleData(data = {}) {
  const { author, collaborators, ...rest } = data;
  const deserializedData = rest;
  if (author && collaborators) {
    deserializedData.authors = [
      {
        id: author.user.id,
        roles: author.roles && author.roles.map(role => `role-${role}`)
      },
      ...collaborators.map(item => ({
        id: item.user.id,
        roles: item.roles && item.roles.map(role => `role-${role}`)
      }))
    ];
  }

  deserializedData.has_printed = Boolean(data.printed);
  deserializedData.use_address_from_profile = data.printed && data.printed[0] && data.printed[0].use_address_from_profile;
  return deserializedData;
}

function isBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}
