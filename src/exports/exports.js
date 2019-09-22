// Export config
import JIRA from './jira'

export default {
  exports: [
    {
      ...JIRA
    }
  ]
}