import { createClient } from "./client"

export async function signUp(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${typeof window !== "undefined" ? window.location.origin : ""}`,
    },
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  return { error }
}

export async function getSession() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  return { data, error }
}

export async function getCurrentUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return { data, error }
}
