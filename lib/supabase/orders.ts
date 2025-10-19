import { createClient } from "./client"

export async function saveOrder(userId: string, orderData: any) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        order_number: orderData.orderNumber,
        items: orderData.items,
        total: orderData.total,
        status: "preparing",
        delivery_address: orderData.deliveryAddress,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  return { data, error }
}

export async function getUserOrders(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select()

  return { data, error }
}
