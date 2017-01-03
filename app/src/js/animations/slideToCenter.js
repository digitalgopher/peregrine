export function SlideToCenterAnimation ( node ) {
	let clientHeight = document.documentElement.clientHeight;
	let rect = document.documentElement.getBoundingClientRect();
	let selfRect = node.getBoundingClientRect();

	let toX = (rect.width / 2) - (selfRect.left + (selfRect.width / 2));
	let toY = (clientHeight / 2) - (selfRect.top + (selfRect.height / 2));

	return [
		{ transform: 'translateX(0px) translateY(0px)', offset: 0 },
		{ transform: 'translateX(' + toX + 'px) translateY(' + toY + 'px)', offset: 1 }
	]
}