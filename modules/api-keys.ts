import { ZuploContext, ZuploRequest, environment, apiServices } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const bucketId = environment.BUCKET_ID;

  const sub = request.user?.sub;
  const userClaims = request.user?.data;
  const body = await request.json()

  await apiServices(`/v2/key-auth/${bucketId}/consumers`, {
    method: "POST",
    data: {
      name: crypto.randomUUID(),
      description: body.description ?? "API Key",
      metadata: {
        // Pass any metadata
        squareSpaceId: userClaims.squareSpaceId ?? "anon",
        name: body.metadata?.name,
        email: body.metadata?.email,
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
