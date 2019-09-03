function getSourceTypes() {
  return [
    {
      title: 'Диссертация',
      value: 'SourceThesis'
    },
    {
      title: 'Статья из сериального издания',
      value: 'SourceArticleSerialEdition'
    },
    {
      title: 'Однотомное издание',
      value: 'SourceOneVolumeBook'
    },
    {
      title: 'Многотомное издание',
      value: 'SourceMultiVolumeBook'
    },
    {
      title: 'Электронный источник',
      value: 'SourceElectronic'
    },
    {
      title: 'Законодательный материал',
      value: 'SourceLegislativeMaterial'
    },
    {
      title: 'Стандарт',
      value: 'SourceStandart'
    },
    {
      title: 'Патент',
      value: 'SourcePatent'
    },
    {
      title: 'Свободный ввод',
      value: 'FreeEntry'
    }
  ];
}

export default getSourceTypes;
