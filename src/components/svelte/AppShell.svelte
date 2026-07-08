<script lang="ts">
	import {
		PanelLeftClose,
		PanelLeftOpen,
		Plus,
		FileText,
		LayoutDashboard,
		Menu,
		Bolt,
		Pen,
		Columns2,
		Rows2,
		Eye,
	} from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import NoteEditor from './NoteEditor.svelte';

	type FileType = 'note' | 'board';
	type DummyFile = { id: string; name: string; type: FileType };
	type EditorMode = 'edit' | 'split' | 'preview';

	let { children } = $props();

	let collapsed = $state(false);
	let activeId = $state<string | null>(null);
	let mobileOpen = $state(false);
	let editorMode = $state<EditorMode>('split');

	const typeIcon: Record<FileType, typeof FileText> = {
		note: FileText,
		board: LayoutDashboard,
	};

	const typeColor: Record<FileType, string> = {
		note: 'var(--color-primary-100)',
		board: 'var(--color-classes-100)',
	};

	const dummyFiles: DummyFile[] = [
		{ id: '1', name: 'Apuntes iniciales', type: 'note' },
		{ id: '2', name: 'Referencias', type: 'note' },
		{ id: '3', name: 'Diagrama de flujo', type: 'board' },
		{ id: '4', name: 'Mapa conceptual', type: 'board' },
	];

	const noteContent: Record<string, string> = {
		'1': '# Apuntes iniciales\n\n## Ideas principales\n\n- Primera idea\n- Segunda idea\n\n**Texto en negrita** y *cursiva*\n\n```js\nconst hola = "mundo";\n```\n\n> Cita importante',
		'2': '# Referencias\n\n1. Fuente uno\n2. Fuente dos\n3. Fuente tres\n\n---\n\n| Columna A | Columna B |\n|-----------|-----------|\n| Celda 1   | Celda 2   |',
	};

	const modeIcons: Record<EditorMode, typeof Pen> = {
		edit: Pen,
		split: Columns2,
		preview: Eye,
	};

	const mobileModeIcons: Record<EditorMode, typeof Pen> = {
		edit: Pen,
		split: Rows2,
		preview: Eye,
	};

	let activeFile = $derived(
		activeId ? (dummyFiles.find((f) => f.id === activeId) ?? null) : null
	);

	function toggleCollapse() {
		collapsed = !collapsed;
	}

	function selectFile(id: string) {
		activeId = id;
	}

	function setEditorMode(mode: EditorMode) {
		editorMode = mode;
	}

	function openMobile() {
		mobileOpen = true;
	}

	function closeMobile() {
		mobileOpen = false;
	}
</script>

{#snippet sidebarBody()}
	<nav class="flex-1 space-y-px overflow-y-auto px-3 pb-3">
		{#each dummyFiles as file (file.id)}
			{@const Icon = typeIcon[file.type]}
			{@const color = typeColor[file.type]}
			{@const active = activeId === file.id}
			<button
				class="relative flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-[background,opacity] duration-100 hover:opacity-90 {collapsed
					? 'justify-center'
					: ''} {active
					? 'opacity-100'
					: 'text-content/60 hover:bg-base-300'}"
				onclick={() => selectFile(file.id)}
			>
				{#if active}
					<span
						class="absolute -left-2 h-[18px] w-[3px] rounded-r-[3px]"
						style="background: {color}"
					></span>
				{/if}
				<span
					class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-white"
					style="background: {color}"
				>
					<Icon size={15} />
				</span>
				{#if !collapsed}
					{file.name}
				{/if}
			</button>
		{/each}
	</nav>
{/snippet}

<!-- ═══ DESKTOP (sm+) ═══ -->
<div class="hidden sm:flex h-dvh">
	<aside
		class="flex flex-col overflow-hidden border-r border-base-400 bg-base-200 transition-all duration-200 ease-linear {collapsed
			? 'w-[60px] min-w-[60px]'
			: 'w-[220px] min-w-[220px]'}"
	>
		<!-- Sidebar header: burger + project name + collapse -->
		<div
			class="flex items-center border-b border-base-400 bg-base-100 h-12 {collapsed
				? 'flex-col justify-center gap-1 px-2 py-2'
				: 'justify-between gap-2 px-3 py-2'}"
		>
			<div class="flex items-center {collapsed ? 'flex-col gap-1' : 'gap-2'}">
				<button
					class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
					aria-label="Cambiar proyecto"
				>
					<Menu size={16} />
				</button>
				{#if !collapsed}
					<span class="text-sm font-medium text-content">Mi Idea</span>
				{/if}
			</div>
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
				onclick={toggleCollapse}
				aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
			>
				{#if collapsed}
					<PanelLeftOpen size={16} />
				{:else}
					<PanelLeftClose size={16} />
				{/if}
			</button>
		</div>

		<!-- Section label (only when expanded) -->
		{#if !collapsed}
			<div class="flex items-center px-3 pt-3 pb-2">
				<span
					class="text-[11px] font-semibold tracking-widest uppercase text-content/35"
				>
					Archivos
				</span>
			</div>

			<!-- Create buttons -->
			<div class="flex gap-2 px-3 pb-2">
				<button
					class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] bg-base-300/50 py-1.5 text-xs font-medium text-content/60 hover:bg-base-300 hover:text-content"
				>
					<Plus size={13} />
					Nota
				</button>
				<button
					class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] bg-base-300/50 py-1.5 text-xs font-medium text-content/60 hover:bg-base-300 hover:text-content"
				>
					<Plus size={13} />
					Board
				</button>
			</div>
		{/if}

		{@render sidebarBody()}

		<!-- Config button al fondo -->
		<div class="border-t border-base-400 p-2">
			<button
				class="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-[background,opacity] duration-100 text-content/60 hover:bg-base-300 hover:opacity-90 {collapsed
					? 'justify-center px-0'
					: ''}"
			>
				<Bolt size={16} class="shrink-0 text-content/60" />
				{#if !collapsed}
					<span class="text-sm font-medium">Config</span>
				{/if}
			</button>
		</div>
	</aside>

	<!-- ═══ MAIN: DESKTOP ═══ -->
	<main class="flex-1 flex flex-col overflow-hidden bg-base-200">
		{#if activeFile}
			<!-- Toolbar: nombre + mode switcher -->
			<header
				class="flex items-center justify-between border-b border-base-400 bg-base-100 px-3 py-2 h-12"
			>
				<span class="text-xs text-content/40">{activeFile.name}</span>
				<div
					class="flex items-center gap-0.5 rounded-lg bg-base-200 p-0.5"
				>
					{#each ['edit', 'split', 'preview'] as mode}
						{@const Icon = modeIcons[mode as EditorMode]}
						{@const isActive = editorMode === mode}
						<button
							class="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors {isActive
								? 'bg-base-100 text-content shadow-sm'
								: 'text-content/40 hover:text-content'}"
							onclick={() => setEditorMode(mode as EditorMode)}
							aria-label={mode}
						>
							<Icon size={16} />
						</button>
					{/each}
				</div>
			</header>

			<!-- Content area -->
			<div class="flex-1 overflow-hidden">
				{#if activeFile.type === 'note'}
					<NoteEditor
						content={noteContent[activeFile.id] ?? ''}
						mode={editorMode}
					/>
				{:else}
					<div class="grid h-full place-items-center">
						<div class="flex flex-col items-center gap-3">
							<LayoutDashboard size={40} class="text-content/15" />
							<p class="text-sm text-content/20">{activeFile.name}</p>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="flex-1 overflow-y-auto">
				{@render children()}
			</div>
		{/if}
	</main>
</div>

<!-- ═══ MOBILE (max-sm) ═══ -->
<div class="sm:hidden flex h-dvh flex-col">
	<!-- Top bar: breadcrumb cuando hay archivo, solo nombre cuando no -->
	<header
		class="flex items-center justify-between border-b border-base-400 bg-base-100 px-3 {activeFile ? 'py-2' : 'py-2.5'}"
	>
		<div class="flex items-center gap-1.5 min-w-0">
			<button
				class="flex shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
				onclick={openMobile}
				aria-label="Abrir menú"
			>
				<PanelLeftOpen size={16} />
			</button>
			<span class="text-sm font-medium text-content shrink-0">Mi Idea</span>
			{#if activeFile}
				<span class="text-sm text-content/20 shrink-0">›</span>
				<span class="text-sm text-content/60 truncate">{activeFile.name}</span>
			{/if}
		</div>
		{#if activeFile}
			<div class="flex items-center gap-0.5 rounded-lg bg-base-200 p-0.5 shrink-0">
				{#each ['edit', 'split', 'preview'] as mode}
					{@const Icon = mobileModeIcons[mode as EditorMode]}
					{@const isActive = editorMode === mode}
					<button
						class="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors {isActive
							? 'bg-base-100 text-content shadow-sm'
							: 'text-content/40 hover:text-content'}"
						onclick={() => setEditorMode(mode as EditorMode)}
						aria-label={mode}
					>
						<Icon size={16} />
					</button>
				{/each}
			</div>
		{/if}
	</header>

	<!-- ═══ MAIN: MOBILE ═══ -->
	<main class="flex-1 flex flex-col overflow-hidden bg-base-200">
		{#if activeFile}
			<!-- Content area -->
			<div class="flex-1 overflow-hidden">
				{#if activeFile.type === 'note'}
					<NoteEditor
						content={noteContent[activeFile.id] ?? ''}
						mode={editorMode}
					/>
				{:else}
					<div class="grid h-full place-items-center">
						<div class="flex flex-col items-center gap-3">
							<LayoutDashboard size={40} class="text-content/15" />
							<p class="text-sm text-content/20">{activeFile.name}</p>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="flex-1 overflow-y-auto">
				{@render children()}
			</div>
		{/if}
	</main>
</div>

<!-- ═══ MOBILE DRAWER (animated) ═══ -->
{#if mobileOpen}
	<div
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-40 bg-black/50 sm:hidden"
		onclick={closeMobile}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') closeMobile();
		}}
	></div>
	<aside
		transition:fly={{ duration: 200, x: -300 }}
		class="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col overflow-hidden bg-base-200 shadow-xl sm:hidden"
	>
		<!-- Drawer header: burger + project name + close (mismo ícono que desktop) -->
		<div class="flex items-center justify-between border-b border-base-400 bg-base-100 px-3 py-2.5">
			<div class="flex items-center gap-2">
				<button
					class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
					aria-label="Cambiar proyecto"
				>
					<Menu size={16} />
				</button>
				<span class="text-sm font-medium text-content">Mi Idea</span>
			</div>
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
				onclick={closeMobile}
				aria-label="Cerrar"
			>
				<PanelLeftClose size={16} />
			</button>
		</div>

		<!-- Section label -->
		<div class="px-3 pt-3 pb-2">
			<span
				class="text-[11px] font-semibold tracking-widest uppercase text-content/35"
			>
				Archivos
			</span>
		</div>

		<!-- Create buttons -->
		<div class="flex gap-2 px-3 pb-2">
			<button
				class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] bg-base-300/50 py-1.5 text-xs font-medium text-content/60 hover:bg-base-300 hover:text-content"
			>
				<Plus size={13} />
				Nota
			</button>
			<button
				class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] bg-base-300/50 py-1.5 text-xs font-medium text-content/60 hover:bg-base-300 hover:text-content"
			>
				<Plus size={13} />
				Board
			</button>
		</div>

		<nav class="flex-1 space-y-px overflow-y-auto px-3 pb-3">
			{#each dummyFiles as file (file.id)}
				{@const Icon = typeIcon[file.type]}
				{@const color = typeColor[file.type]}
				{@const active = activeId === file.id}
				<button
					class="relative flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-[background,opacity] duration-100 hover:opacity-90 {active
						? 'opacity-100'
						: 'text-content/60 hover:bg-base-300'}"
					onclick={() => {
						selectFile(file.id);
						closeMobile();
					}}
				>
					{#if active}
						<span
							class="absolute -left-2 h-[18px] w-[3px] rounded-r-[3px]"
							style="background: {color}"
						></span>
					{/if}
					<span
						class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-white"
						style="background: {color}"
					>
						<Icon size={15} />
					</span>
					{file.name}
				</button>
			{/each}
		</nav>

		<!-- Config button al fondo del drawer -->
		<div class="border-t border-base-400 p-2">
			<button
				class="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-[background,opacity] duration-100 text-content/60 hover:bg-base-300 hover:opacity-90"
			>
				<Bolt size={16} class="shrink-0 text-content/60" />
				<span class="text-sm font-medium">Config</span>
			</button>
		</div>
	</aside>
{/if}
