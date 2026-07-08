<script lang="ts">
	import { EditorView } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { EditorState } from '@codemirror/state';
	import MarkdownIt from 'markdown-it';

	import {
		highlightSpecialChars,
		drawSelection,
		dropCursor,
		rectangularSelection,
		crosshairCursor,
		highlightActiveLine,
		keymap,
	} from '@codemirror/view';

	import {
		indentOnInput,
	} from '@codemirror/language';

	import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
	import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
	import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
	import { lintKeymap } from '@codemirror/lint';
	import { cmEditorTheme } from '../../lib/cm-editor-theme';

	type EditorMode = 'edit' | 'split' | 'preview';

	let { content = '', mode = 'split' as EditorMode } = $props();

	let editorEl = $state<HTMLDivElement>();
	let previewEl = $state<HTMLDivElement>();
	let view: EditorView;

	const md = new MarkdownIt({ html: true });
	let previewHtml = $state('');

	function renderPreview(doc: string) {
		previewHtml = md.render(doc);
	}

	$effect(() => {
		renderPreview(content);
	});

	$effect(() => {
		if (!editorEl) return;

		view = new EditorView({
			doc: content,
			extensions: [
				highlightSpecialChars(),
				history(),
				drawSelection(),
				dropCursor(),
				EditorState.allowMultipleSelections.of(true),
				...cmEditorTheme,
				indentOnInput(),
				closeBrackets(),
				autocompletion(),
				rectangularSelection(),
				crosshairCursor(),
				highlightActiveLine(),
				highlightSelectionMatches(),
				keymap.of([
					...closeBracketsKeymap,
					...defaultKeymap,
					...searchKeymap,
					...historyKeymap,
					...completionKeymap,
					...lintKeymap,
				]),
				markdown(),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						renderPreview(update.state.doc.toString());
					}
				}),
			],
			parent: editorEl,
		});

		return () => {
			view.destroy();
		};
	});
</script>

<div
	class="h-full overflow-hidden {mode === 'edit'
		? ''
		: mode === 'split'
			? 'grid grid-cols-2 divide-x divide-base-400 max-sm:grid-cols-1 max-sm:grid-rows-2 max-sm:divide-x-0'
			: ''}"
>
	<!-- CodeMirror -->
	<div
		class="h-full overflow-y-auto {mode === 'preview' ? 'hidden' : ''} max-sm:order-2 max-sm:border-t max-sm:border-base-400"
		bind:this={editorEl}
	></div>

	<!-- Preview -->
	{#if mode !== 'edit'}
		<div
			class="md-preview h-full overflow-y-auto px-6 py-5 {mode === 'preview' ? 'col-span-2' : ''} max-sm:order-1"
			bind:this={previewEl}
		>
			{@html previewHtml}
		</div>
	{/if}
</div>

<style>
	:global(.cm-editor) {
		height: 100%;
	}
	:global(.cm-scroller) {
		overflow-y: scroll;
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 14px;
		line-height: 1.6;
		padding: 0;
	}
	:global(.cm-editor.cm-focused) {
		outline: none;
	}
	:global(.cm-content) {
		padding: 20px 24px;
		color: var(--color-content);
	}
	:global(.cm-line) {
		padding: 0;
	}

	/* ── Scrollbar siempre visible ── */
	:global(.md-preview) {
		overflow-y: scroll;
		scrollbar-width: auto;
		scrollbar-color: var(--color-base-400) transparent;
	}
	:global(.cm-scroller::-webkit-scrollbar),
	:global(.md-preview::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
	}
	:global(.cm-scroller::-webkit-scrollbar-thumb),
	:global(.md-preview::-webkit-scrollbar-thumb) {
		background: var(--color-base-400);
		border-radius: 4px;
		min-height: 40px;
	}

	/* ── Markdown preview styles ── */
	:global(.md-preview h1) {
		font-size: 1.875rem;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 1rem;
		color: var(--color-content);
	}
	:global(.md-preview h2) {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.25;
		margin: 1.5rem 0 0.75rem;
		color: var(--color-content);
	}
	:global(.md-preview h3) {
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.3;
		margin: 1.25rem 0 0.5rem;
		color: var(--color-content);
	}
	:global(.md-preview h4) {
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.4;
		margin: 1rem 0 0.5rem;
		color: var(--color-content);
	}
	:global(.md-preview p) {
		margin: 0 0 0.75rem;
		line-height: 1.7;
		color: var(--color-content);
	}
	:global(.md-preview ul),
	:global(.md-preview ol) {
		margin: 0 0 0.75rem;
		padding-left: 1.5rem;
		color: var(--color-content);
	}
	:global(.md-preview li) {
		margin: 0.25rem 0;
		line-height: 1.6;
	}
	:global(.md-preview ul > li) {
		list-style-type: disc;
	}
	:global(.md-preview ol > li) {
		list-style-type: decimal;
	}
	:global(.md-preview blockquote) {
		margin: 0 0 0.75rem;
		padding: 0.5rem 1rem;
		border-left: 3px solid var(--color-primary-100);
		color: var(--color-content);
		opacity: 0.8;
		font-style: italic;
	}
	:global(.md-preview code) {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.875em;
		padding: 0.15em 0.4em;
		border-radius: 4px;
		background: var(--color-base-300);
		color: var(--color-content);
	}
	:global(.md-preview pre) {
		margin: 0 0 0.75rem;
		padding: 1rem;
		border-radius: 8px;
		background: var(--color-base-300);
		overflow-x: auto;
	}
	:global(.md-preview pre code) {
		padding: 0;
		background: transparent;
		font-size: 0.8125rem;
		line-height: 1.5;
	}
	:global(.md-preview a) {
		color: var(--color-primary-100);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	:global(.md-preview a:hover) {
		opacity: 0.8;
	}
	:global(.md-preview hr) {
		margin: 1.5rem 0;
		border: none;
		border-top: 1px solid var(--color-base-400);
	}
	:global(.md-preview table) {
		width: 100%;
		border-collapse: collapse;
		margin: 0 0 0.75rem;
	}
	:global(.md-preview th),
	:global(.md-preview td) {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-base-400);
		text-align: left;
		font-size: 0.875rem;
	}
	:global(.md-preview th) {
		font-weight: 600;
		background: var(--color-base-300);
	}
	:global(.md-preview strong) {
		font-weight: 700;
	}
	:global(.md-preview em) {
		font-style: italic;
	}
</style>
