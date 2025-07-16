import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const accountName = environment.ZUPLO_ACCOUNT_NAME;
  const bucketName = environment.BUCKET_NAME
  const apiKey = environment.API_KEY
  
  return new Request(`https://dev.zuplo.com/v1/accounts/${accountName}/key-buckets/${bucketName}/consumers`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    }
  });
}