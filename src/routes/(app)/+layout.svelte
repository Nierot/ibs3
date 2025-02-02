<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
	import LogoMobile from '$lib/components/LogoSmallMobile.svelte';
	import { clickOutside } from '$lib/events/clickOutside';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CalendarDays from '~icons/tabler/calendar-bolt';
	import InformationCircle from '~icons/tabler/info-circle';
	import Cake from '~icons/tabler/beer';
	import Users from '~icons/tabler/users';
	import Folder from '~icons/tabler/pig-money';
	import Admin from '~icons/tabler/shield-check';
	import Cog6Tooth from '~icons/tabler/settings';
	import FaceFrown from '~icons/tabler/accessible-off';
	import Music from '~icons/tabler/music';
	import PopupMenu from '$lib/components/PopupMenu.svelte';
	import Breadcrumps from '$lib/components/breadcrumps.svelte';
	import { LDAP_IDS } from '$lib/constants';
	import type { Committee } from '@prisma/client';
	import { env } from '$env/dynamic/public';
	import Toast from '$lib/components/toast.svelte';
	import Confirm from '$lib/components/confirm.svelte';
	import Prompt from '$lib/components/prompt.svelte';
	import PromptSelect from '$lib/components/prompt-select.svelte';
	import PromptCheckbox from '$lib/components/prompt-checkbox.svelte';
	import { toast } from '$lib/notification';

	// vierkante schermen zijn voor homo's
	$: innerWidth = 0;
	$: innerHeight = 0;

	$: if (innerHeight / innerWidth >= 0.99 && innerHeight / innerWidth <= 1.01) {
		toast({
			title: 'Oei!',
			message: 'Het lijkt erop dat je een vierkant scherm gebruikt',
			type: 'warning'
		});

		// Toggle root element filter to turn everything black
		const root = document.documentElement;
		root.style.filter = 'grayscale(100%) contrast(0.5)';
	}

	let showMenu: boolean = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}

	let bestCommittee = 'Lid';

	onMount(() => {
		const data = $page.data;
		if (data.committees && data.committees.length > 0) {
			bestCommittee = getBestId(data.committees);
		}
	});

	const getBestId = (committees: Committee[]): string => {
		let order = [
			LDAP_IDS.COLOSSEUM,
			LDAP_IDS.MEMBERS,
			LDAP_IDS.FINANCIE,
			LDAP_IDS.ADMINS,
			LDAP_IDS.SENAAT,
			LDAP_IDS.FEUTEN
		];

		let best = committees[0];

		// Now find the committee where their ldapId is the highest in the order array
		// Not every committee is in the order, ignore those
		for (let i = 1; i < committees.length; i++) {
			const committee = committees[i];
			if (order.indexOf(committee.ldapId) > order.indexOf(best.ldapId)) {
				best = committee;
			}
		}

		switch (best.ldapId) {
			case LDAP_IDS.FEUTEN:
				return 'Feut';
			case LDAP_IDS.SENAAT:
				return 'Senaat';
			case LDAP_IDS.ADMINS:
				return 'Admin';
			case LDAP_IDS.FINANCIE:
				return 'Financie';
			case LDAP_IDS.COLOSSEUM:
				return 'Colosseum-bewoner';
			case LDAP_IDS.MEMBERS:
				return 'Lid';
			default:
				return 'Lid';
		}
	};
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="toast">
	<Toast />
</div>

<div class="confirm">
	<Confirm />
</div>

<div class="prompt">
	<Prompt />
</div>

<div class="promptSelect">
	<PromptSelect />
</div>

<div class="promptCheckbox">
	<PromptCheckbox />
</div>

<div id="layout-background" class="w-screen col-span-0" />
<div id="layout-div" class="grid gap-4 grid-cols-12 grid-row-12">
	<aside
		class="z-10 h-[10vh]
		sm:relative 
		sm:h-[calc(100vh-2.5rem)]
		sm:row-span-12
		drop-shadow 
		sm:flex-col
		sm:col-span-4
		rounded-lg
		xl:col-span-3 2xl:col-span-3
		md:m-5"
	>
		<section id="layout-top">
			<button on:click={() => goto('/')}>
				<div class="center-logo">
					<Logo width="75%" />
				</div>
			</button>
		</section>

		<hr />

		<section>
			<a href="/kalender" class="sm:justify-left sm:items-start sm:w-full ">
				<i><CalendarDays font-size="1.3rem" /></i>
				<span class="hidden sm:block">Kalender</span>
			</a>
		</section>

		<section>
			<a href="/strafbakken" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Cake font-size="1.3rem" /></i>
				<span class="hidden sm:block">Strafbakken</span>
			</a>
		</section>

		<section>
			<a href="/financieel" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Folder font-size="1.3rem" /></i>
				<span class="hidden sm:block">Financieel</span>
			</a>
		</section>

		<section>
			<a href="/playlist" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Music font-size="1.3rem" /></i>
				<span class="hidden sm:block">Playlist</span>
			</a>
		</section>

		<section>
			<a href="/maluspunten" class="sm:justify-left sm:items-start sm:w-full ">
				<i><FaceFrown font-size="1.3rem" /></i>
				<span class="hidden sm:block">Maluspunten</span>
			</a>
		</section>

		<section>
			<a href="/leden" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Users font-size="1.3rem" /></i>
				<span class="hidden sm:block">Leden</span>
			</a>
		</section>

		<section>
			<a href="/instellingen" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Cog6Tooth font-size="1.3rem" /></i>
				<span class="hidden sm:block">Instellingen</span>
			</a>
		</section>

		<section>
			<a href="/admin" class="sm:justify-left sm:items-start sm:w-full ">
				<i><Admin font-size="1.3rem" /></i>
				<span class="hidden sm:block">Admin</span>
			</a>
		</section>

		<section>
			<a href="/over">
				<i><InformationCircle font-size="1.3rem" /></i>
				<span class="hidden sm:block">IBS v{env.PUBLIC_VERSION}</span>
			</a>
		</section>
	</aside>

	<div
		id="layout-content"
		class="sm:block col-span-12 sm:col-span-8 xl:col-span-9 2xl:col-span-9 sm:p-0"
	>
		<header class="p-5 sm:p-0 sm:pr-5">
			<div class="hidden md:flex">
				<Breadcrumps />
			</div>

			<div class="block mobile-logo">
				<button on:click={() => goto('/')}>
					<LogoMobile />
				</button>
			</div>

			<button id="layout-user" on:click={toggleMenu} use:clickOutside on:click_outside={closeMenu}>
				<div id="layout-user-card">
					<p id="layout-name">
						{$page.data.user.firstName + ' ' + $page.data.user.lastName ?? 'Gebruiker'}
					</p>
					<p id="layout-title">{bestCommittee}</p>
				</div>
				<!-- <button>Log uit</button> -->
				{#if $page.data.user.picture == null}
					<img src="https://avatars.githubusercontent.com/u/11670885?v=4" alt="user" />
				{:else}
					<img src={env.PUBLIC_UPLOAD_URL + 'users/' + $page.data.user.picture} alt="user" />
				{/if}
				<PopupMenu {showMenu} />
			</button>
		</header>

		<main
			class="pb-[15vh] sm:pb-[10vh] sm:pb-0 mr-0 sm:mr-5 sm:mt-3 p-5 sm:pr-5 sm:rounded-lg drop-shadow"
		>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	.center-logo {
		justify-content: center;
		align-items: center;
		display: flex;
	}

	main {
		height: calc(100vh - 6rem);
		background-color: var(--card-color);

		overflow: auto;
		overflow-x: hidden;
	}

	header {
		height: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		color: white;

		#layout-user {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 0.8rem;

			img {
				width: 3rem;
				height: 3rem;
				object-fit: cover;
				border-radius: 50%;
			}
		}

		#layout-user #layout-name {
			font-weight: 550;
		}

		#layout-user #layout-title {
			font-size: 0.8rem;
			float: right;
			color: var(--light-grey-color);
		}
	}

	#layout-background {
		z-index: -1;
		position: absolute;
		height: 22rem;
		width: 100vw;
		background-color: var(--primary-color);
		background: linear-gradient(145deg, var(--primary-color) 0%, var(--primary-light-color) 100%);
	}

	aside {
		background-color: var(--card-color);

		// Mobile
		@media (max-width: 639px) {
			position: fixed;
			width: calc(100vw - 2em);
			top: calc(100vh - 135px);

			// Mozilla
			@supports (-moz-appearance: meterbar) {
				top: calc(100vh - 125px);
			}

			height: 80px;
			margin-left: 1rem;

			display: grid;
			grid-template-columns: repeat(4, 1fr);

			/* shadow */
			box-shadow: 0 0 5px var(--shadow-color);

			// Haal logo, hr, en alles behalve de eerste 4 icoontjes weg
			& > section:nth-child(-n + 2),
			& > section:nth-child(n + 7),
			hr {
				display: none;
			}

			section {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		// Regular screens
		@media (min-width: 640px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			#layout-top {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				height: 10rem;
				color: var(--text-color);
			}

			section:not(#layout-top) {
				width: 100%;
				padding-left: 2.5rem;
				padding-right: 2.5rem;
				width: 100%;
			}

			section:last-of-type {
				margin-top: auto;
				margin-bottom: 1rem;
			}

			hr {
				border-top: 1px solid var(--seperator-color);
				width: 80%;
				align-self: center;
				margin-bottom: 1rem;
				border-radius: 5px;
			}
		}
	}

	section {
		a {
			display: flex;
			gap: 0.2rem;
			color: var(--text-color);
			padding: 1rem;

			i {
				color: var(--text-color);
			}
		}

		a:hover {
			background: rgb(126, 34, 206);
			background: linear-gradient(145deg, #7e22ce 0%, #8b5cf6 100%);
			border-radius: 5px;
			color: var(--button-text-color);

			i {
				color: var(--button-text-color);
			}
		}
	}

	.toast {
		z-index: 1000;
		position: fixed;
		bottom: 2rem;
		right: 2rem;
	}
</style>
