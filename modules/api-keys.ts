import { ZuploContext, ZuploRequest, environment, apiServices } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const accountName = environment.ZUPLO_ACCOUNT_NAME;
  const bucketId = environment.BUCKET_ID ??  "bckt_2nt4EJySjm6c8fUXMzLEsOdY9nqKzHIHM" ?? "bckt_17q5xYxVVtW88VW7UMHx7WykOnHXv2HoS";

  const sub = request.user?.sub;
  const userClaims = request.user?.data;

  await apiServices(`/v2/key-auth/${bucketId}/consumers`, {
    method: "POST",
    data: {
      name: crypto.randomUUID(),
      description: "API Key",
      metadata: {
        squareSpaceId: userClaims.squareSpaceId ?? "anon",
      },
      tags: {},
      managers: [
        {
          // email: "",
          sub, // if no sub is passed, an invite will be created
        }
      ]
    },
  });
}