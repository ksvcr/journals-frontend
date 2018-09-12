function getStatusColor(status) {
  switch (status) {
    case 'DRAFT':
      return '#6f6f6f';

    case 'SENT':
    case 'MODIFIED':
    case 'SENT_AFTER_REVISION':
      return '#6135be';

    case 'PRELIMINARY_REVISION':
    case 'REVISION':
    case 'DISAPPROVED':
    case 'CALL_OFF':
    case 'DELETE':
      return '#f85151';

    case 'AWAIT_REVIEWER':
      return '#24ce9b';

    case 'AWAIT_REVIEW':
      return '#575039';

    case 'AWAIT_REDACTOR':
      return '#418be3';

    case 'AWAIT_PAYMENT':
      return '#ff971d';

    case 'AWAIT_PROOFREADING':
      return '#0b7177';

    case 'AWAIT_TRANSLATE':
      return '#b28b27';

    case 'AWAIT_PUBLICATION':
      return '#208b52';

    case 'PUBLISHED':
      return '#9e4747';

    default:
      return '#6f6f6f';
  }
}

export default getStatusColor;
