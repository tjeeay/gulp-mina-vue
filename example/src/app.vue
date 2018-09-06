<script>
import { formatTime } from './utils/util.js'

export default App({
  config: {
    homepage: 'pages/home/home',
    window: {
      navigationBarTitleText: 'MINA VUE DEMO'
    }
  },
  onLaunch() {
    console.log(`app launch at: ${formatTime(new Date())}`)
  }
})
</script>
