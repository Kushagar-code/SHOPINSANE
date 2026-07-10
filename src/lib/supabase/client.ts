import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://vpbrguytkaelchyxmywf.supabase.co",
    "sb_publishable_IxbBo8II5_jNRn_sxlwQiA_ZnQPrS2S"
  )
}
