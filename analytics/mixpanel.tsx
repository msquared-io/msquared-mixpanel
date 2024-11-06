//Import Mixpanel SDK
import {
  useAppSelector,
  userSelectors,
} from "@improbable/m2-frontend-state-management"
import mixpanel from "mixpanel-browser"
import React, { useEffect } from "react"

// Pass in your project token here
mixpanel.init("PROJECT_TOKEN", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  // Route events from Mixpanel’s SDKs via a proxy in your own domain - prevents adblockers impacting tracking.
  // See more: https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript#tracking-via-proxy
  api_host: "https://proxy-production-d569.up.railway.app/",
})

export function MixpanelComponent() {
  const account = useAppSelector(userSelectors.getAuthUser)
  const linkedEvmWallet = useAppSelector(
    userSelectors.getEvmLinkedWalletAddress,
  )
  const profile = useAppSelector(userSelectors.getProfile)

  useEffect(() => {
    if (account?.uid) {
      mixpanel.identify(account.uid)
      mixpanel.people.set({
        $email: account.email,
        $name: profile?.username,
        $avatar: profile?.profilePictureUrl,
        wallet: linkedEvmWallet,
        userId: account.uid,
      })
    }
  }, [account, linkedEvmWallet, profile])

  return <></>
}
