/**
 * exporting this way to stop babel from yelling about hot reloading.
 * it doesn't like this syntax:
 *  export { default as OffenseIcon } from './OffenseIcon';
 * oh well.
 */

import OffenseIcon from './OffenseIcon';
import DefenseIcon from './DefenseIcon';

export {
	OffenseIcon,
	DefenseIcon
}