import db from "@/lib/db"

export async function GET(_, { params }) {
  try {
    const product = await db.Order.findUnique({
      where: { id: params.id }
    }) 

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    } 

    return Response.json(product)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}