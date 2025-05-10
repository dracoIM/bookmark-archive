// import cron from "node-cron";
// import { prisma } from "./prisma";
// import {
//   fetchTwitterBookmarks,
//   fetchFacebookBookmarks,
//   fetchYouTubeBookmarks,
//   fetchRedditBookmarks,
//   fetchThreadsBookmarks,
// } from "./social";

// cron.schedule("*/15 * * * *", async () => {
//   const users = await prisma.user.findMany();
//   for (const u of users) {
//     try {
//       if (u.accounts.find((a) => a.provider === "twitter")) {
//         await fetchTwitterBookmarks({
//           accessToken: u.accounts.find((a) => a.provider === "twitter")!
//             .accessToken!,
//           userId: u.id,
//         });
//       }
//       // ...same for facebook, reddit, youtube, threads
//     } catch (_) {
//       /* errors are logged inside each fetcher */
//     }
//   }
// });

// console.log("🔄 Social fetch scheduler started");
