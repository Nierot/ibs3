<script lang="ts">
	import { fade } from 'svelte/transition';
	import { notifications } from '../notification';
	import InfoCircle from '~icons/tabler/info-circle';
	import ExclamationCircle from '~icons/tabler/exclamation-circle';
	import AlertCirlce from '~icons/tabler/alert-circle';
	import CircleCheck from '~icons/tabler/circle-check';
</script>

{#if $notifications}
	<div class="notifications">
		{#each $notifications as notification}
			<div role="alert" class="notification {notification.type}" transition:fade>
				<div class="icon">
					{#if notification.type === 'info'}
						<InfoCircle />
					{:else if notification.type === 'success'}
						<CircleCheck />
					{:else if notification.type === 'warning'}
						<AlertCirlce />
					{:else if notification.type === 'error'}
						<ExclamationCircle />
					{/if}
				</div>
				<div class="body">
					<h3 class="title">
						{notification.title}
					</h3>
					<p class="message">
						{notification.message}
					</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	$radius: 10px;
	$icon-size: 2rem;

	.notifications {
		color: white;
	}

	.icon {
		height: 100%;
		width: calc(#{$icon-size} + 1rem);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notification {
		padding-bottom: 1rem;
		padding-top: 1rem;
		padding-right: 1rem;
		padding-left: 0.5rem;

		display: grid;
		grid-template-columns: 3rem 4fr;
	}

	.notification:first-child {
		border-top-left-radius: $radius;
		border-top-right-radius: $radius;
	}

	.notification:last-child {
		border-bottom-left-radius: $radius;
		border-bottom-right-radius: $radius;
	}

	.success {
		background-color: var(--primary-color);
	}

	.error {
		background-color: var(--error-color);
	}

	.warning {
		background-color: var(--secondary-color);
	}

	.info {
		background-color: var(--tertiary-color);
	}
</style>
