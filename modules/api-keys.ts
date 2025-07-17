import { ZuploContext, ZuploRequest, environment, apiServices } from "@zuplo/runtime";

async function maybeJson(request) {
  try {
    return request.json()
  } catch {
    return {}
  }
}

export default async function (request: ZuploRequest, context: ZuploContext) {
  const accountName = environment.ZUPLO_ACCOUNT_NAME;
  const bucketId = environment.BUCKET_ID ??  "bckt_2nt4EJySjm6c8fUXMzLEsOdY9nqKzHIHM" ?? "bckt_17q5xYxVVtW88VW7UMHx7WykOnHXv2HoS";

  const sub = request.user?.sub;
  const userClaims = request.user?.data;
  const body = await maybeJson(request)

  await apiServices(`/v2/key-auth/${bucketId}/consumers`, {
    method: "POST",
    data: {
      name: crypto.randomUUID(),
      description: body.description ?? "API Key",
      metadata: {
        // Pass any metadata
        squareSpaceId: userClaims.squareSpaceId ?? "anon",
      },
      tags: {},
      managers: [
        {
          // email: "", // Optionally pass the users email
          sub, // This links the identities
        }
      ]
    },
  });
}