/**
 * Every year's holiday photo shows us holding last year's framed card.
 *
 * Each entry describes one photo in `public/card/<year>.jpg`:
 * - `frame` is where the held frame (last year's card) sits in the photo,
 *   as percentages of the photo's width and height, measured from the
 *   top-left corner. The zoom heads for this spot and it is the only
 *   clickable part of the photo.
 * - `aspect` is the photo's width divided by its height, so the frame
 *   overlay lines up before the image has loaded.
 *
 * The oldest year's `frame` is ignored: there is nothing older to zoom into.
 *
 * TODO: the frame positions below are placeholders until the real photos
 * are in `public/card/`.
 */

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

const placeholderFrame: FrameRect = { x: 38, y: 40, width: 24, height: 24 };

const photos: HolidayCardPhoto[] = [
  { year: 2018, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2019, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2020, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2021, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2022, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2023, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2024, aspect: 3 / 2, frame: placeholderFrame },
  { year: 2025, aspect: 3 / 2, frame: placeholderFrame },
];

/** Newest first: index 0 is the current year's card. */
export const holidayCards: HolidayCardPhoto[] = [...photos].sort(
  (a, b) => b.year - a.year,
);

export const photoSrc = (year: number) => `/card/${year}.jpg`;
