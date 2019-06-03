import CommandWithPopup from './CommandWithPopup';
import CommandButton from './CommandButton';
import ColorPicker from '~/components/ColorPicker/ColorPicker'

export default CommandWithPopup(CommandButton, { content: ColorPicker });
