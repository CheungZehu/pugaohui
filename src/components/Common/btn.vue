<template>
	<!-- <x-input ref="input" :value="value" @input="updateValue($event.target.value)"></x-input> -->
	<!-- <x-input :title="inputData.title" :value="value" @input="updateValue($event.target.value)"></x-input> -->
	<span>
		<input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">
	</span>
	
</template>

<script>
	import { XInput } from 'vux'

	export default {
		components: {
			XInput
		},
		props: ['value'],
		// props: ['inputData', 'value'],

		methods: {
			// updateValue (value) {
			// 	this.$emit('input', value)
			// }
			 updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件发出数值
      this.$emit('input', Number(formattedValue))
    }
		}
	}
</script>