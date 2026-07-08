import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const editorTheme = EditorView.theme({
	'&': {
		backgroundColor: 'var(--color-base-200)',
		color: 'var(--color-content)',
	},
	'.cm-content': {
		caretColor: 'var(--color-primary-100)',
	},
	'.cm-cursor, .cm-dropCursor': {
		borderLeftColor: 'var(--color-primary-100)',
	},
	'.cm-selectionBackground': {
		background: 'var(--color-primary-300) !important',
	},
	'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
		background: 'var(--color-primary-300) !important',
	},
	'.cm-activeLine': {
		backgroundColor: 'transparent',
	},
	'.cm-selectionMatch': {
		backgroundColor: 'var(--color-primary-400)',
	},
	'.cm-matchingBracket, .cm-nonmatchingBracket': {
		backgroundColor: 'transparent',
		outline: 'none',
	},
	'.cm-tooltip': {
		backgroundColor: 'var(--color-base-100)',
		border: '1px solid var(--color-base-400)',
		color: 'var(--color-content)',
	},
	'.cm-tooltip-autocomplete ul li[aria-selected]': {
		backgroundColor: 'var(--color-primary-300)',
		color: 'var(--color-content)',
	},
	'.cm-panel': {
		backgroundColor: 'var(--color-base-100)',
		border: '1px solid var(--color-base-400)',
	},
	'.cm-panel input, .cm-panel button': {
		backgroundColor: 'var(--color-base-200)',
		color: 'var(--color-content)',
		border: '1px solid var(--color-base-400)',
	},
});

const editorSyntax = syntaxHighlighting(
	HighlightStyle.define([
		{ tag: tags.heading1, color: 'var(--color-content)', fontWeight: '700', fontSize: '1.3em' },
		{ tag: tags.heading2, color: 'var(--color-content)', fontWeight: '700', fontSize: '1.2em' },
		{ tag: tags.heading3, color: 'var(--color-content)', fontWeight: '600', fontSize: '1.15em' },
		{ tag: tags.heading4, color: 'var(--color-content)', fontWeight: '600', fontSize: '1.1em' },
		{ tag: tags.heading5, color: 'var(--color-content)', fontWeight: '600' },
		{ tag: tags.heading6, color: 'var(--color-content)', fontWeight: '600' },

		{ tag: tags.comment, color: 'var(--color-content)', opacity: '0.45' },
		{ tag: tags.lineComment, color: 'var(--color-content)', opacity: '0.45' },
		{ tag: tags.blockComment, color: 'var(--color-content)', opacity: '0.45' },
		{ tag: tags.docComment, color: 'var(--color-content)', opacity: '0.45' },

		{ tag: tags.keyword, color: 'var(--color-primary-100)' },
		{ tag: tags.controlKeyword, color: 'var(--color-primary-100)' },
		{ tag: tags.definitionKeyword, color: 'var(--color-primary-100)', fontWeight: '600' },
		{ tag: tags.moduleKeyword, color: 'var(--color-primary-100)' },
		{ tag: tags.operatorKeyword, color: 'var(--color-primary-100)' },

		{ tag: tags.string, color: 'var(--color-schedule-100)' },
		{ tag: tags.docString, color: 'var(--color-schedule-100)' },
		{ tag: tags.character, color: 'var(--color-schedule-100)' },
		{ tag: tags.attributeValue, color: 'var(--color-schedule-100)' },
		{ tag: tags.regexp, color: 'var(--color-schedule-100)' },

		{ tag: tags.number, color: 'var(--color-classes-100)' },
		{ tag: tags.integer, color: 'var(--color-classes-100)' },
		{ tag: tags.float, color: 'var(--color-classes-100)' },
		{ tag: tags.bool, color: 'var(--color-classes-100)' },

		{ tag: tags.typeName, color: 'var(--color-grades-100)' },
		{ tag: tags.className, color: 'var(--color-grades-100)' },

		{ tag: tags.propertyName, color: 'var(--color-content)' },
		{ tag: tags.variableName, color: 'var(--color-content)' },
		{ tag: tags.labelName, color: 'var(--color-content)' },
		{ tag: tags.self, color: 'var(--color-primary-100)' },
		{ tag: tags.null, color: 'var(--color-primary-100)' },
		{ tag: tags.atom, color: 'var(--color-primary-100)' },

		{ tag: tags.operator, color: 'var(--color-content)', opacity: '0.6' },

		{ tag: tags.punctuation, color: 'var(--color-content)', opacity: '0.5' },
		{ tag: tags.bracket, color: 'var(--color-content)', opacity: '0.5' },
		{ tag: tags.separator, color: 'var(--color-content)', opacity: '0.5' },

		{ tag: tags.link, color: 'var(--color-primary-100)', textDecoration: 'underline' },
		{ tag: tags.url, color: 'var(--color-primary-100)' },

		{ tag: tags.strong, fontWeight: '700' },
		{ tag: tags.emphasis, fontStyle: 'italic' },
		{ tag: tags.strikethrough, textDecoration: 'line-through' },
		{ tag: tags.monospace, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },

		{ tag: tags.inserted, color: 'var(--color-success-100)' },
		{ tag: tags.deleted, color: 'var(--color-error-100)' },
		{ tag: tags.changed, color: 'var(--color-warning-100)' },

		{ tag: tags.invalid, color: 'var(--color-error-100)' },
		{ tag: tags.meta, color: 'var(--color-content)', opacity: '0.5' },
		{ tag: tags.documentMeta, color: 'var(--color-content)', opacity: '0.5' },
		{ tag: tags.annotation, color: 'var(--color-content)', opacity: '0.5' },
		{ tag: tags.processingInstruction, color: 'var(--color-content)', opacity: '0.5' },
	])
);

export const cmEditorTheme = [editorTheme, editorSyntax];
