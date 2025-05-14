import { z } from "zod";

export const newBookMarkSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  //   platform: z.string(),
  faviconUrl: z.string(),
  siteName: z.string(),
  imageUrl: z.string(),
  markdown: z.string(),
});

export type NewBookMark = z.infer<typeof newBookMarkSchema>;
