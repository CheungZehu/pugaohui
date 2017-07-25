<template>
	<x-input></x-input>
</template>

<script>
	import { XInput } from 'vux'

	export default {
		components: {
			XInput
		},
		props: ['inputData']
	}
</script>