<script lang="ts">
	import {
		PanelLeftClose,
		PanelLeftOpen,
		Plus,
		FileText,
		LayoutDashboard,
		Menu,
		User,
		Download,
	} from '@lucide/svelte';

	type FileType = 'note' | 'board';

	type DummyFile = {
		id: string;
		name: string;
		type: FileType;
	};

	let { children } = $props();

	let collapsed = $state(false);
	let activeId = $state<string | null>(null);

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

	function toggleCollapse() {
		collapsed = !collapsed;
	}

	function selectFile(id: string) {
		activeId = id;
	}
</script>

<div
	class="grid h-dvh overflow-hidden"
	style="grid-template-rows: 40px 1fr; grid-template-columns: {collapsed ? '60px' : '220px'} 1fr"
>
	<!-- ═══ TOP BAR ═══ -->
	<header
		class="col-span-2 flex items-center justify-between border-b border-base-400 bg-base-100 px-3"
	>
		<div class="flex items-center gap-2">
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
			>
				<Menu size={16} />
			</button>
			<span class="text-sm font-medium text-content">Mi Idea</span>
		</div>

		<div class="flex items-center gap-1">
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
			>
				<User size={15} />
			</button>
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-content/40 hover:bg-base-300 hover:text-content"
			>
				<Download size={15} />
			</button>
		</div>
	</header>

	<!-- ═══ SIDEBAR ═══ -->
	<aside
		class="flex flex-col overflow-hidden border-r border-base-400 bg-base-200 transition-all duration-200 ease-linear"
	>
		<!-- Header -->
		<div
			class="flex items-center {collapsed
				? 'justify-center px-3 pt-3 pb-2'
				: 'justify-between px-3 pt-3 pb-2'}"
		>
			{#if !collapsed}
				<span
					class="text-[11px] font-semibold tracking-widest uppercase text-content/35"
				>
					Archivos
				</span>
			{/if}
			<button
				class="flex cursor-pointer items-center justify-center rounded-md p-1 text-content/40 hover:bg-base-300 hover:text-content"
				onclick={toggleCollapse}
				aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
			>
				{#if collapsed}
					<PanelLeftOpen size={15} />
				{:else}
					<PanelLeftClose size={15} />
				{/if}
			</button>
		</div>

		<!-- Create buttons -->
		{#if !collapsed}
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

		<!-- File list -->
		<nav class="flex-1 space-y-px overflow-y-auto px-3 pb-3">
			{#each dummyFiles as file (file.id)}
				{@const Icon = typeIcon[file.type]}
				{@const color = typeColor[file.type]}
				{@const active = activeId === file.id}
				<button
					class="relative flex w-full cursor-pointer text-content/60 items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-[background,opacity] duration-100 hover:opacity-90 {collapsed
						? 'justify-center'
						: ''} {active
						? 'opacity-100'
						: 'hover:bg-base-300'}"
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
	</aside>

	<!-- ═══ MAIN ═══ -->
	<main class="overflow-y-auto bg-base-200">
		{@render children()}
	</main>
</div>
