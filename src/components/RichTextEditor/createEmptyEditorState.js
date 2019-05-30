import convertFromJSON from './convertFromJSON';

const EMPTY_DOC_JSON = { 'type':'doc','content':[{ 'type':'paragraph','content':[{ 'type':'text','text':' текст ' },{ 'type':'text','marks':[{ 'type':'em' }],'text':'по' },{ 'type':'text','text':' ' },{ 'type':'text','marks':[{ 'type':'strong' }],'text':'умолчанию' }] }] };


export default function createEmptyEditorStateSchema(schema, plugins) {
  // TODO: Check if schema support doc and paragraph nodes.
  return convertFromJSON(EMPTY_DOC_JSON, schema, plugins);
}
