import { createClient } from "./client"

export async function saveFeedback(feedbackData: any) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("feedback")
    .insert([
      {
        name: feedbackData.name,
        email: feedbackData.email,
        order_number: feedbackData.orderNumber || null,
        rating: feedbackData.rating,
        category: feedbackData.category,
        message: feedbackData.message,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  return { data, error }
}

export async function getFeedback(limit = 50) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  return { data, error }
}
