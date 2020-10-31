<template>
  <textarea :ref="refkey" :name="name" class="details" :value="value" @input="expandTextarea(); $emit('input', $event)"
            :required="required" ></textarea>
</template>

<script>
export default {
  name: 'E-TextArea',
  props: {
    refkey: String,
    name: String,
    value: String,
    required: Boolean
  },
  methods: {
    expandTextarea () {
      var textarea = this.$refs[this.refkey]
      textarea.style.height = '' /* Reset the height */
      textarea.style.height = (textarea.scrollHeight + 2) + 'px'
    }
  },
  mounted () {
    this.expandTextarea()
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
