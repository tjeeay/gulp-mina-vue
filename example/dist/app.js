
import { formatTime } from './utils/util.js';

export default App({
  onLaunch() {
    console.log(`app launch at: ${formatTime(new Date())}`);
  }
});