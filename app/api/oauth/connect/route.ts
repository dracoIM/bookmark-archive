import { auth } from "@/lib/auth";
import { serverEnv as env } from "@/lib/server-env";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!provider || !session) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const userId = session.user.id;

  let oauthUrl: string;

  switch (provider) {
    case "twitter":
      // Twitter OAuth flow
      oauthUrl = `https://twitter.com/i/oauth2/authorize?oauth_consumer_key=${env.TWITTER_CLIENT_ID}&oauth_callback=${encodeURIComponent(env.NEXT_PUBLIC_APP_URL + "/api/oauth/callback/twitter")}&state=${userId}`;
      break;
    case "instagram":
      // Instagram OAuth flow
      oauthUrl = `https://api.instagram.com/oauth/authorize?client_id=${env.INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.NEXT_PUBLIC_APP_URL + "/api/oauth/callback/instagram")}&response_type=code&scope=user_profile,user_media&state=${userId}`;
      break;
    case "facebook":
      // Facebook OAuth flow
      oauthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${env.FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.NEXT_PUBLIC_APP_URL + "/api/oauth/callback/facebook")}&response_type=code&scope=public_profile,email&state=${userId}`;
      break;
    case "linkedin":
      // LinkedIn OAuth flow
      oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${env.LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.NEXT_PUBLIC_APP_URL + "/api/oauth/callback/linkedin")}&state=${userId}&scope=r_liteprofile,r_emailaddress,w_member_social`;
      break;

    default:
      return new NextResponse("Invalid provider", { status: 400 });
  }

  return NextResponse.json({ url: oauthUrl });
}
