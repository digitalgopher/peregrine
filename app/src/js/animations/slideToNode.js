export function SlideToNodeAnimation ( fromNode, toNode ) {
	let clientHeight = document.documentElement.clientHeight;
	let rect = document.getElementById( toNode).getBoundingClientRect();
	let selfRect = fromNode.getBoundingClientRect();

	let toX = rect.left - selfRect.left;
	let toY = rect.top - selfRect.top;

	return [
		{ transform: 'translateX(0px) translateY(0px)', offset: 0 },
		{ transform: 'translateX(' + toX + 'px) translateY(' + toY + 'px)', offset: 1 }
	]
}