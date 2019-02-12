export default function isShowDecision(articleState) {
  const statusesForDecision = ['AWAIT_REDACTOR', 'AWAIT_PAYMENT', 'AWAIT_PUBLICATION'];
  return Boolean(~statusesForDecision.indexOf(articleState));
}
