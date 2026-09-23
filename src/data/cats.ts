export interface CatMediaItem {
  src: string;
  alt: string;
  fallbackMood: "wave" | "bored" | "suspicious" | "happy" | "chaotic" | "love" | "apology";
}

export const cats: Record<string, CatMediaItem> = {
  hello: {
    src: "/cats/Cat Hello GIF.gif",
    alt: "waving cute cat",
    fallbackMood: "wave",
  },
  low: {
    src: "/cats/Cry GIF.gif",
    alt: "crying sad cat",
    fallbackMood: "bored",
  },
  medium: {
    src: "/cats/Sad Cat GIF.gif",
    alt: "sad questioning cat",
    fallbackMood: "suspicious",
  },
  high: {
    src: "/cats/Idea Intensifies GIF.gif",
    alt: "happy excited cat",
    fallbackMood: "happy",
  },
  ten: {
    src: "/cats/Dance Cat GIF.gif",
    alt: "chaotic ecstatic cat",
    fallbackMood: "chaotic",
  },
  idea: {
    src: "/cats/Idea Intensifies GIF.gif",
    alt: "idea intensifies cat",
    fallbackMood: "chaotic",
  },
  disbelief: {
    src: "/cats/Disbelief No GIF.gif",
    alt: "cat disbelief no",
    fallbackMood: "chaotic",
  },
  cupcake: {
    src: "/cats/Kisses Love GIF.gif",
    alt: "loving sweet kissing cat",
    fallbackMood: "love",
  },
  myBad: {
    src: "/cats/demnit.gif",
    alt: "apologetic funny cat",
    fallbackMood: "apology",
  },
  proud: {
    src: "/cats/Proud Of You Good Job GIF.gif",
    alt: "proud of you good job cat",
    fallbackMood: "happy",
  },
  highScore: {
    src: "/cats/classicsurprisedlook.gif",
    alt: "surprised high score cat",
    fallbackMood: "happy",
  },
  hateBranchCat: {
    src: "/cats/hellfirekitten.gif",
    alt: "hellfire fiery attitude cat",
    fallbackMood: "chaotic",
  },
  surprisedBranchCat: {
    src: "/cats/caringcat.gif",
    alt: "sweet caring cat",
    fallbackMood: "love",
  },
};
