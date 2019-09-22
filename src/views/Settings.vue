<template>
  <div class="settings">
    <fieldset v-for="sheetExport in sheetExports" :key="sheetExport.name">
      <legend>{{ sheetExport.name }}</legend>
      <p v-for="setting in sheetExport.settings" :key="sheetExport.name + '-' + setting.name">
        <label :for="sheetExport.name + '-' + setting.name">{{ setting.name }}</label>
        <input :type="setting.type" :id="sheetExport.name + '-' + setting.name" :name="sheetExport.name + '-' + setting.name" value="" />
      </p>
    </fieldset>
  </div>
</template>

<script>
import ConfiguredExports from '@/exports/exports'

export default {
  name: 'Settings',
  data () {
    return {
      sheetExports: ConfiguredExports.exports
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid;
  border-radius: 4px;
  padding: 1em 4em;
}
fieldset > p {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
fieldset > p:not(:last-of-type) {
  margin-bottom: 1em;
}
fieldset > p:last-of-type {
  margin-bottom: 0.5em;
}
fieldset label {
  color: inherit;
  padding: 0.5em 0;
  font-size: 1rem;
  line-height: 1.5em;
  height: 2.625em;
  box-sizing: border-box;
}
fieldset input {
  border: 1px solid #999999;
}
</style>
