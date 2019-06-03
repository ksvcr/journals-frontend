import UICommand from './UICommand';

export default function createCommand(execute) {
  class CustomCommand extends UICommand {
    isEnabled = (state) => {
      return this.execute(state);
    };

    execute = (
      state,
      dispatch,
      view
    ) => {
      const tr = state.tr;
      let endTr = tr;
      execute(
        state,
        nextTr => {
          endTr = nextTr;
          dispatch && dispatch(endTr);
        },
        view
      );
      return endTr.docChanged || tr !== endTr;
    };
  }
  return new CustomCommand();
}
