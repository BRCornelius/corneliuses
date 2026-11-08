/**
 * Every year's holiday photo shows us holding last year's framed card.
 *
 * The data lives in `holiday-cards.json`, which `npm run card` maintains
 * (see scripts/holiday-card.mjs). Each entry describes `public/card/<year>.jpg`:
 * - `aspect` is the photo's width divided by its height, so the frame
 *   overlay lines up before the image has loaded.
 * - `frame` is where the held frame (last year's card) sits in the photo,
 *   as percentages of the photo's width and height from the top-left
 *   corner. The zoom heads for this spot and it is the only clickable part
 *   of the photo. The oldest year doesn't need one.
 */
import data from "./holiday-cards.json";

export type FrameRect = {
  /** Left edge, % of photo width. */
  x: number;
  /** Top edge, % of photo height. */
  y: number;
  /** Width, % of photo width. */
  width: number;
  /** Height, % of photo height. */
  height: number;
};

export type HolidayCardPhoto = {
  year: number;
  aspect: number;
  frame: FrameRect;
};

type Entry = { year: number; aspect: number; frame?: FrameRect | null };

// Used until a year's frame has been measured, so the page still works.
const unmappedFrame: FrameRect = { x: 40, y: 40, width: 20, height: 20 };

/** Newest first: index 0 is the current year's card. */
export const holidayCards: HolidayCardPhoto[] = (data as Entry[])
  .map((e) => ({ year: e.year, aspect: e.aspect, frame: e.frame ?? unmappedFrame }))
  .sort((a, b) => b.year - a.year);

export const photoSrc = (year: number) => `/card/${year}.jpg`;
