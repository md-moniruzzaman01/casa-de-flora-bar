
export interface ImageItem { src: string; alt: string; aspect: string; }
export interface InfiniteColumnProps {
  images:    ImageItem[];
  direction?: "up" | "down";
  speed?:    number;
  className?: string;
  height:    number;
}