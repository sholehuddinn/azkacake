import db from "@/lib/db"

export async function GET() {
  try {
    const products = await db.Product.findMany()
    return Response.json(products)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const product = await db.Product.create({
      data: {
        name: body.name,
        description: body.description,
        category_id: body.category_id,
        sold_count: body.sold_count,
        price: body.price,
        image: body.image
      }
    })
    return Response.json(product)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
