// Export specifics for JIRA
export default {
  name: 'JIRA',
  settings: {
    // Required/Configurable settings here
    username: {
      name: 'Username',
      type: 'text',
      required: true
    },
    password: {
      name: 'Password',
      type: 'password',
      required: true
    },
    endpoint: {
      name: 'URL',
      type: 'text',
      required: true
    }
  },
  // The Actual export function, takes the settings object
  export (settings) {
    // Export definition here, crappy e.g.
  }
}
