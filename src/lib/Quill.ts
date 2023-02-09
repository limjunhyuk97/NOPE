import Quill from 'quill';

export function quill(node: HTMLElement, options: any) {
	const quill = new Quill(node, {
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, 4, false] }],
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block', 'link'],

				[{ list: 'ordered' }, { list: 'bullet' }],
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

	quill.on('text-change', function () {
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
