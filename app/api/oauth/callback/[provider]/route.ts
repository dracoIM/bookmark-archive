import { serverEnv as env } from "@/lib/server-env";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  const { provider } = params;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return new NextResponse("Missing code or state", { status: 400 });
  }

  try {
    switch (provider) {
      case "instagram":
        // TODO: Implement Instagram callback logic
        // For Instagram, you'll need to exchange the code for an access token
        // and then fetch user data.  This is a placeholder.
        // Replace with actual Instagram API calls.
        try {
          const tokenResponse = await fetch(
            "https://api.instagram.com/oauth/access_token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: env.INSTAGRAM_CLIENT_ID,
                client_secret: env.INSTAGRAM_CLIENT_SECRET,
                code: code as string,
                grant_type: "authorization_code",
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/instagram`,
              }),
            },
          );

          if (!tokenResponse.ok) {
            console.error(
              "Instagram token error:",
              tokenResponse.status,
              await tokenResponse.text(),
            );
            return new NextResponse("Instagram token exchange failed", {
              status: 400,
            });
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
          const userId = state; // Assuming state is the user ID

          // Fetch user info
          const userResponse = await fetch(
            `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`,
          );

          if (!userResponse.ok) {
            console.error(
              "Instagram user info error:",
              userResponse.status,
              await userResponse.text(),
            );
            return new NextResponse("Instagram user info fetch failed", {
              status: 400,
            });
          }

          const userData = await userResponse.json();

          // Save to ApiKey table
          try {
            await prisma.apiKey.create({
              data: {
                id: userData.id,
                userId: userId as string,
                provider: "instagram",
                accessToken: accessToken,
              },
            });
          } catch (error) {
            console.error("Prisma error:", error);
            return new NextResponse("Failed to save to ApiKey table", {
              status: 500,
            });
          }

          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
          );
        } catch (error) {
          console.error("Instagram OAuth error:", error);
          return new NextResponse("Instagram OAuth failed", { status: 500 });
        }
        break;
      case "facebook":
        // TODO: Implement Facebook callback logic
        // For Facebook, you'll need to exchange the code for an access token
        // and then fetch user data.  This is a placeholder.
        try {
          const tokenResponse = await fetch(
            "https://graph.facebook.com/v12.0/oauth/access_token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: env.FACEBOOK_CLIENT_ID,
                client_secret: env.FACEBOOK_CLIENT_SECRET,
                code: code as string,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/facebook`,
              }),
            },
          );

          if (!tokenResponse.ok) {
            console.error(
              "Facebook token error:",
              tokenResponse.status,
              await tokenResponse.text(),
            );
            return new NextResponse("Facebook token exchange failed", {
              status: 400,
            });
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
          const userId = state; // Assuming state is the user ID

          // Fetch user info
          const userResponse = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
          );

          if (!userResponse.ok) {
            console.error(
              "Facebook user info error:",
              userResponse.status,
              await userResponse.text(),
            );
            return new NextResponse("Facebook user info fetch failed", {
              status: 400,
            });
          }

          const userData = await userResponse.json();

          // Save to ApiKey table
          try {
            await prisma.apiKey.create({
              data: {
                id: userData.id,
                userId: userId as string,
                provider: "facebook",
                accessToken: accessToken,
              },
            });
          } catch (error) {
            console.error("Prisma error:", error);
            return new NextResponse("Failed to save to ApiKey table", {
              status: 500,
            });
          }

          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
          );
        } catch (error) {
          console.error("Facebook OAuth error:", error);
          return new NextResponse("Facebook OAuth failed", { status: 500 });
        }
        break;
      case "linkedin":
        // TODO: Implement LinkedIn callback logic
        // For LinkedIn, you'll need to exchange the code for an access token
        // and then fetch user data.  This is a placeholder.
        try {
          const tokenResponse = await fetch(
            "https://www.linkedin.com/oauth/v2/accessToken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: env.LINKEDIN_CLIENT_ID,
                client_secret: env.LINKEDIN_CLIENT_SECRET,
                code: code as string,
                grant_type: "authorization_code",
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/linkedin`,
              }),
            },
          );

          if (!tokenResponse.ok) {
            console.error(
              "LinkedIn token error:",
              tokenResponse.status,
              await tokenResponse.text(),
            );
            return new NextResponse("LinkedIn token exchange failed", {
              status: 400,
            });
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
          const userId = state; // Assuming state is the user ID

          // Fetch user info
          const userResponse = await fetch(
            `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))&oauth2_access_token=${accessToken}`,
          );

          if (!userResponse.ok) {
            console.error(
              "LinkedIn user info error:",
              userResponse.status,
              await userResponse.text(),
            );
            return new NextResponse("LinkedIn user info fetch failed", {
              status: 400,
            });
          }

          const userData = await userResponse.json();

          // Save to ApiKey table
          try {
            await prisma.apiKey.create({
              data: {
                id: userData.id,
                userId: userId as string,
                provider: "linkedin",
                accessToken: accessToken,
              },
            });
          } catch (error) {
            console.error("Prisma error:", error);
            return new NextResponse("Failed to save to ApiKey table", {
              status: 500,
            });
          }

          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
          );
        } catch (error) {
          console.error("LinkedIn OAuth error:", error);
          return new NextResponse("LinkedIn OAuth failed", { status: 500 });
        }
        break;
      case "twitter":
        // TODO: Implement Twitter callback logic
        // For Twitter, you'll need to exchange the code for an access token
        // and then fetch user data.  This is a placeholder.
        try {
          const tokenResponse = await fetch(
            "https://api.twitter.com/2/oauth2/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${env.TWITTER_CLIENT_ID}:${env.TWITTER_CLIENT_SECRET}`).toString("base64")}`,
              },
              body: new URLSearchParams({
                code: code as string,
                grant_type: "authorization_code",
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/twitter`,
                code_verifier: "challenge", // Replace with your actual code verifier
              }),
            },
          );

          if (!tokenResponse.ok) {
            console.error(
              "Twitter token error:",
              tokenResponse.status,
              await tokenResponse.text(),
            );
            return new NextResponse("Twitter token exchange failed", {
              status: 400,
            });
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
          const userId = state; // Assuming state is the user ID

          // Fetch user info
          const userResponse = await fetch(
            "https://api.twitter.com/2/users/me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (!userResponse.ok) {
            console.error(
              "Twitter user info error:",
              userResponse.status,
              await userResponse.text(),
            );
            return new NextResponse("Twitter user info fetch failed", {
              status: 400,
            });
          }

          const userData = await userResponse.json();

          // Save to ApiKey table
          try {
            await prisma.apiKey.create({
              data: {
                id: userData.data.id,
                userId: userId as string,
                provider: "twitter",
                accessToken: accessToken,
              },
            });
          } catch (error) {
            console.error("Prisma error:", error);
            return new NextResponse("Failed to save to ApiKey table", {
              status: 500,
            });
          }

          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
          );
        } catch (error) {
          console.error("Twitter OAuth error:", error);
          return new NextResponse("Twitter OAuth failed", { status: 500 });
        }
        break;
      default:
        return new NextResponse("Invalid provider", { status: 400 });
    }

    // TODO: Handle successful authentication
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new NextResponse("OAuth callback failed", { status: 500 });
  }
}
