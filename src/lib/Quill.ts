import Quill from 'quill';

// quill 함수가 실행되면, node(DOM element)가 editor를 포함하도록 한다.
export function quill(node: HTMLElement, options: any) {
	const quill = new Quill(node, {
		modules: {
			syntax: true,
			toolbar: [
				[{ header: [1, 2, 3, 4, false] }],
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block', 'link'],

				[{ list: 'list' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }],

				[{ color: ['red', 'green'] }, { background: [] }]
			]
		},
		placeholder: '',
		theme: 'snow',
		...options
	});

	const container = node.getElementsByClassName('ql-editor')[0];

	//* 클릭시 .ql-picker-options 바로 사라지는 문제 해결 *//
	const toolBar = node?.parentElement?.getElementsByClassName('ql-toolbar')[0];
	const pickers = toolBar?.getElementsByClassName('ql-picker');

	for (const picker of pickers) {
		const optionsContainer = picker.getElementsByClassName('ql-picker-options')[0];
		const options = optionsContainer.getElementsByClassName('ql-picker-item');
		for (const item of options) {
			picker.addEventListener('mouseover', () => {
				item.addEventListener('mouseup', (e) => {
					item.click();
					optionsContainer.setAttribute('aria-hidden', 'true');
				});
			});
		}
	}
	//* 클릭시 .ql-picker-options 바로 사라지는 문제 해결 *//

	// editor의 text-change 시 발생하는 event를 dispatch
	quill.on('text-change', function (range, oldRange, source) {
		node.dispatchEvent(
			new CustomEvent('text-change', {
				detail: {
					html: container.innerHTML,
					text: quill.getText()
				}
			})
		);
	});
}
