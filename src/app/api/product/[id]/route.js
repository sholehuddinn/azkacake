import db from "@/lib/db"

export async function GET(_, { params }) {
  try {
    const product = await db.Product.findUnique({
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

export async function PUT(req, { params }) {
  try {
    const body = await req.json()
    const updated = await db.Product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category_id: body.category_id,
        sold_count: body.sold_count,
        image: body.image
      }
    })
    return Response.json(updated)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(_, { params }) {
  try {
    await db.Product.delete({
      where: { id: params.id }
    })
    return new Response("data berhasil di hapus", { status: 204 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
