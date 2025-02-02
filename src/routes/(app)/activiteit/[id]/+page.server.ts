import db from '$lib/server/db'
import { randomSortDay } from '$lib/utils.js'

export const load = (async ({ params }) => {
  const activity = await db.activity.findFirstOrThrow({
    where: {
      id: parseInt(params.id)
    },
    include: {
      attending: {
        include: {
          user: true
        }
      },
      organisedBy: true,
      location: true,
    }
  })

  const attending = randomSortDay(activity.attending)

  return {
    activity,
    attending
  }
})