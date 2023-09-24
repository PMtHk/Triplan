const REFRESH_RATE = 1000 * 60 * 60 - 10 * 1000 // 1 hour - 10 seconds

// Silent refresh (client)
export default function onSilentRefresh() {
  // TODO: Get accessToken from App (recoil)
  const accessToken = ''

  try {
    // TODO: refresh accessToken
    
    // setTimeout(onSilentRefresh, REFRESH_RATE)
  } catch (error) {
    // TODO: force logout
  }
}
