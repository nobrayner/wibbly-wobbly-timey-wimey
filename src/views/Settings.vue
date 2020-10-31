<template>
  <div class="settings">
    <h1>Settings</h1>
    <hr />
    <h2>General</h2>
    <fieldset>
      <!-- TODO -->
      <p>General Settings TBA</p>
    </fieldset>
    <h2>Export Settings</h2>
    <fieldset v-for="sheetExport in sheetExports" :key="sheetExport.name">
      <legend>{{ sheetExport.name }}</legend>
      <p>
        <label :for="sheetExport.name + '_ticketmatcher'">Ticket Matcher</label>
        <input type="text" :id="sheetExport.name + '_ticketmatcher'" :name="sheetExport.name + '_ticketmatcher'" :value="sheetExport.ticketmatcher" />
      </p>
      <p>
        <label :for="sheetExport.name + '_endpoint'">Endpoint</label>
        <input type="text" :id="sheetExport.name + '_endpoint'" :name="sheetExport.name + '_endpoint'" :value="sheetExport.endpoint" />
      </p>
      <p>
        <label :for="sheetExport.name + '_requesttemplate'">Request Template</label>
        <e-textarea :id="sheetExport.name + '_requesttemplate'" :name="sheetExport.name + '_requesttemplate'" :value="sheetExport.requesttemplate" />
      </p>
      <h3>Settings</h3>
      <p v-for="setting in sheetExport.settings" :key="sheetExport.name + '-' + setting.name">
        <label :for="sheetExport.name + '-' + setting.name">{{ setting.name }}</label>
        <input :type="setting.type" :id="sheetExport.name + '-' + setting.name" :name="sheetExport.name + '-' + setting.name" value="" />
      </p>
    </fieldset>
  </div>
</template>

<script>
import ETextArea from '@/components/ExpandingTextArea.vue'

export default {
  name: 'Settings',
  components: {
    'e-textarea': ETextArea
  },
  data () {
    return {
      sheetExports: {}
    }
  },
  beforeMount () {
    fetch('/exports/defaults.json').then((response) => {
      response.json().then((json) => {
        this.sheetExports = json
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
hr {
  border-width: 0.5px;
  color: #999999;
  margin: 0;
}
h1 {
  font-size: 1.75rem;
  margin: 0.5em 0 1em 0;
}
h2 {
  margin: 1.2em 0;
  font-size: 1.4rem;
}
h3 {
  font-size: 1.2rem;
  margin: 2rem 0 1rem 0;
}
fieldset {
  border: 1px solid;
  border-radius: 4px;
  padding: 1em 2em;
  margin-bottom: 1em;
}
fieldset > p {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
fieldset > p:not(:last-of-type):not(:only-child) {
  margin-bottom: 1em;
}
fieldset > legend {
  margin-left: -1em;
  font-size: 1.2rem;
  padding: 0 1em;
}
fieldset > legend ~ p:last-of-type {
  margin-bottom: 0.4em;
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
