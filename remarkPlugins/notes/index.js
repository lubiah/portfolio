import { visit } from 'unist-util-visit';
import icons from './icons.js';

const NOTES_NAMES = ['info'];

const plugin = () => {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type === 'containerDirective' && NOTES_NAMES.includes(node.name)) {
				const type = node.name;
				const data = node.data ?? (node.data = {});
				data.hName = 'aside';
				data.hProperties = {
					class: `note note--${type}`
				};

				const iconContainer = {
					type: 'html',
					value: `<span class='icon'>${icons[type].value}</span>`
				};

				const contentContainer = {
					type: 'element',
					data: {
						hProperties: {
							class: 'content'
						}
					},
					children: [...node.children]
				};

				node.children = [iconContainer, contentContainer];
			}
		});
	};
};

export default plugin;
