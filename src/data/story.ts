export const story = {
  intro: {
    greeting: "hi",
    button: "hi back",
    subtext: "the cat wanted to say something.",
  },

  missQuestion: {
    kicker: "i don't wanna sound repetitive but...",
    title: "i know you maybe got bored of this question but, how much did you miss me tho?",
    min: 0,
    max: 10,
    reactions: {
      low: {
        range: [0, 1, 2, 3],
        text: "damn.",
        subtext: "that's actually crazy.",
      },
      medium: {
        range: [4, 5, 6],
        text: "comme onnn",
        subtext: "you can do better than that",
      },
      high: {
        range: [7, 8, 9],
        text: "okayyyy 👀",
        subtext: "we're getting somewhere.",
      },
      ten: {
        range: [10],
        text: "I KNEW IT.",
        subtext: "obviously.",
      },
    },
    button: "lock in answer →",
  },

  sureSequence: {
    initialQuestion: "are you sure?",
    initialButton: "yes",
    threshold: 8, // scores < 8 trigger escalation
    escalationSteps: [
      {
        question: "are you REALLY sure?",
        button: "yes",
        note: "think carefully.",
      },
      {
        question: "are you fr sure??",
        button: "absolutly",
        note: "this is getting out of hand.",
      },
      {
        question: "like... actually actually sure???",
        button: "I SAID YES.",
        note: "you're making a huge mistake.",
      },
      {
        question: "BRO. طب والبيتزا الي بيننا",
        button: "I said what I said",
        note: "system failure imminent.",
      },
      {
        question: "OKAY THEN.",
        button: "press to accept fate",
        note: "overriding your bad answer...",
      },
    ],
    reveal: {
      laugh: "hahahaha",
      knewIt: "I knew it. you didn't really think i would let you answer that",
      cupcake: "Anyways I missed you too, cupcake ❤️",
      button: "continue →",
    },
    highScore: {
      text: "huh i actually didn't expect that i would score that high tbh but you know there is no scale that can descripe how much i did miss you",
      button: "next →",
    },
  },

  arabicQuestion: {
    text: "انتي لسا مش طايقاني؟؟",
    subtext: "نخش في الموضوع على طول",
    yes: "اه",
    no: "لا",
    noReaction: "yeah bruh just say your real answer ain't no tricks here",
  },

  privateJoke: {
    text: "اه؟ مقولنا بطلي بورن هه",
    subtext: "don't freak out plz",
    video: "/video/freakyahhvideo.mp4",
    button: "خخخخخ",
  },

  myBad: {
    title: "my bad shawty",
    subtitle: "anyway...",
    caption: "moving on.",
    button: "what's all this about? ->",
  },

  final: {
    kicker: "don't rush me...",
    title: "i meannn you know how it is. i just keep asking dumbass questions and expecting to have defferant answers. and for that. just type what has been going in your mind since last time we talked",
    subtitle: "make it quick i know you're not a yapping fan.",
    placeholder: "type here...",
    button: "send to daddy →",
    successHeading: "daddy has recieved your note",
    successText: "i hope it's not another [i hate you] i appreciate it anyways tho",
    button1: "i do hate you",
    button2: "you'll be surprised",
  },

  branchQuestions: {
    // Branch if she clicked button1 ("i do hate you")
    hateBranch: {
      question: "you really are that sticker. anyways i gotta ask how are you after the surgery",
      subtitle: "choose one honestly:",
      options: [
        { text: "i'm feeling much better", reaction: "بركاتك يا بدوي" },
        { text: "it's okey but yeah still aching", reaction: "maybe if you stopped hating on a nigga it could've been differant" },
        { text: "i've never felt so كفراوية", reaction: "oh shit. doesn't get worst that that ig" },
      ],
    },
    // Branch if she clicked button2 ("you'll be surprised")
    surprisedBranch: {
      question: "i am surprised already. and since we are here i wanna know how are you after your surgery",
      subtitle: "choose one honestly:",
      options: [
        { text: "i'm feeling much better", reaction: "بركاتك يا بدوي" },
        { text: "it's okey but yeah still aching", reaction: "demn cupcake. hope for you a speed recovery" },
        { text: "i've never felt so كفراوية", reaction: "oh shit. doesn't get worst that that ig" },
      ],
    },
    nextPhaseButton: "say when you gotta say →",
  },

  captchaGame: {
    kicker: "SECURITY CLEARANCE REQUIRED",
    heading: "Cat-CAPTCHA Verification",
    subtext: "sorry for interuption but there's a note i gotta give you and i need to verfy it's you before moving on",
    step1: {
      instruction: "Select how i imagin you most of the time",
      cats: [
        { id: 1, label: "hungry cat", src: "/cats/hungrycat.jpg" },
        { id: 2, label: "angry cat", src: "/cats/angrycat.gif" },
        { id: 3, label: "side eye cat", src: "/cats/sideeyecat.gif" },
        { id: 4, label: "chaos cat", src: "/cats/chaoscat.gif" },
      ],
      verifyBtn: "Verify Identity →",
      successMsg: "✓ Biometrics verified. Definitely you.",
    },
    step2: {
      instruction: "Step 2: Sign the Legal Immunity Agreement",
      terms: [
        "I hereby promise not to murder him for making this ridiculous website.",
        "I admit he is at least 1% funny and tried his best.",
      ],
      continueBtn: "Sign & Proceed →",
      successMsg: "✓ Legal immunity secured.",
    },
    step3: {
      instruction: "Step 3: Biometric Authorization (i hope you're not bored)",
      hint: "Hold the paw to break the wax seal",
      holdBtn: "🐾 HOLD TO UNLOCK 🐾",
      unlockingText: "Decrypting secret letter...",
      successMsg: "✓ ACCESS GRANTED! 💌",
    },
  },

  letter: {
    sealLabel: "CONFIDENTIAL LOVE NOTE",
    title: "funny thing to mention",
    body: [
      "you kept saying i was choosing the times when you have been missed up to come up with my bullshit but guess what cupcake",
      "ironically i was there when you're sick out of your surgery even when we were apart (i did fuck some shit up) but hey, told i'll always be ...."
    ],
    signoff: "love, your idiot ❤️",
    showImageButtonText: "click to continue the note",
    hideImageButtonText: "hide photo",
    secretImage: "/cats/chaseatlanticcover.jpg",
    secretImageCaption: "",
    underPhotoText: "RIGHT HERE",
    continueBtn: "continue →",
  },

  apologyPhase: {
    badge: "please don't kill me🥺",
    title: "yeah i know you told me about this",
    text: "but i'm so sorry cupcake i couldn't help imagining your face watching this😭😭😭",
    gif: "/cats/Sad Cat GIF.gif",
    buttonYes: "I LAUGHED TBH",
    buttonNo: "YOU ARE DEAD",
  },

  songPhase: {
    // When she laughed
    laughBranch: {
      badge: "GOOD GIRL 🐾",
      reaction: "aww that's a good girl 🥺",
      subtext: "okay fine. pick a song. you earned it.",
      gif: "/cats/Dance Cat GIF.gif",
      songs: [
        {
          title: "From Time",
          artist: "Drake ft. Jhené Aiko",
          emoji: "",
          src: "/music/From Time [CikjiSG8eRM].mp3",
          comment: "OH SHIT SHE'S AN OG ???",
        },
        {
          title: "Ew",
          artist: "Joji",
          emoji: "",
          src: "/music/Joji - Ew.mp3",
          comment: "I CAN'T. I LEGITIMATELY CAN'T",
        },
        {
          title: "Pink Dolphin Sunset",
          artist: "Tory Lanez & Tee Grizzley",
          emoji: "",
          src: "/music/Tory Lanez Tee - Pink Dolphin Sunset.mp3",
          comment: "WORD FOR WORD. this is literally me istg",
        },
      ],
      pickedText: "",
    },
    // When she said YOU ARE DEAD
    deadBranch: {
      badge: "CONTRACT VIOLATION 🔒",
      reaction: "excuse me?? you literally signed the legal immunity agreement",
      subtext: "you literally said : I hereby promise not to murder him. you broke the law cupcake. for that you are being FORCED to pick from the following shitty ass songs (if i can't listen to music then no one will):",
      gif: "/cats/hellfirekitten.gif",
      songs: [
        {
          title: "Narein",
          artist: "Tul8te",
          emoji: "",
          src: "/music/Narein (Jazz Edition, Live) [5Og7BhKFPJA].mp3",
          comment: "ngl i don't mind if this played in a background in a caffee in kafr el-shiekh(it did)",
        },
        {
          title: "Heseeny",
          artist: "Tul8te",
          emoji: "",
          src: "/music/Heseeny (Jazz Edition, Live) [YqdejLTMAlE].mp3",
          comment: "heseeny. HESEENY. i hope that trigger something asshole",
        },
        {
          title: "Habeeby Da",
          artist: "Tul8te",
          emoji: "",
          src: "/music/Habeeby Da (Jazz Edition, Live) [MB4jmqCYrrM].mp3",
          comment: "habeeby da? i mean that wasn't the case when you fooled me to call you mommy",
        },
      ],
      pickedText: "i didn't but the rules cupcake",
    },
    continueBtn: "okay okay i've suffered enough →",
  },

  threeSectionStory: {
    badge: "CHAPTERS & MEMORIES 📖",
    title: "A Few Things I Want You To Know",
    subtitle: "take your time reading this...",
    sections: [
      {
        id: 1,
        title: "i'll make it quick",
        text: "since god knows what song is currently playing in the background i don't think you would want me to make this longer than it should. last time we talked was absolutly crazy it didn't feel real and i have no idea what type of drugs we both were on but i don't even wanna talk about the details of it but i did realize something. i said multible times that you bring the best of me and sometimes you feel like you're dragging me down. but here what i knew from last week. you just bring the max of me depends on the situation we are in. i really got hurt by too many things were said like i didn't keep my words or didn't complete my promises i screenshoted them and kept torturing myself with them. specially that i'm known around my friends and in my job that my word is literally like a blade i get paid before even delivering the work that's how much they trusted me. but with you i let my emotions and anger take over which fucked up my image in your head and got us both damaged and as i said i'm sorry for that and i'm sorry you felt like i dragged you down ",
        image: "/cats/trynaignorit.gif",
        alt: "Section 1 Photo",
      },
      {
        id: 2,
        title: "What is this website about",
        text: "you can call it anything you want. what i know is i didn't build it to apologize because i did that 1000 times already and i didn't build it to make you pitty me. what happend is i was so stuck on the moments when you laughed so hard in our last call i felt like nothing ever happend like i had a time machine and for a minute you forgot about all our problems and felt home enough to let that beautiful laugh out because of my jokes. so i felt like i was willing to take any chance to make you laugh or smile again even if that meant building a website for 4 hours that you may never open (i'll probebly هبضن and dm you to open it). so yeah i would go this far tho i work mostly 6-7 hours on average this week. i hope it atleast made you smile. and sorry if you picked the wrong choices to end up listinig to tul8te while reading this lol",
        image: "/cats/us.jpg",
        alt: "us",
      },
      {
        id: 3,
        title: "What's the next step",
        text: "as i said before. last time we talked was a complete mess i don't remember the last time i got this emotional talking to someone it's like our hole relationship played infront of my eyes and i saw myself firing to the person i love the most and this same person is trying her hardest to kill me with her words. until we both broke down and suddenly there was nowhere else to go but back to each other (refrencing that stupid reel you sent me where they kissed in the end of the world). won't forget how we started to comfort eachother and how we pretended like nothing ever happend just to not feel this shit again or not hurt on another again. the way we stayed up all day because closing your eyes meant the end of that dream and we will go back to be strangers again. you stayed up tho you had a surgery and i stayed up tho i didn't have enough sleep in the past 2 days. what we had in these last couple of hours was so good it didn't even feel real you had to refrence a dream you had. and i wouldn't have built this website after it or make up my mind in going to your hometown on saturday unless i didn't noticed myself how i didn't wanna sleep because i kept replaying the sound of your laugh in my head and when i slept and woke up i didn't wanna leave the bed because i kept picturing your laugh again. so if there is any small chance to see that laugh again one more time i'll gladly take it. and i'll ask you to click the button in the bottom of this page (note: i wish we had more pics)",
        image: "/cats/meandher.jpg",
        alt: "Section 3 Photo",
      },
    ],
    finalPhaseBtn: "go to final phase →",
  },

  finalPhase: {
    badge: "THE FINAL CHAPTER ❤️",
    title: "As i said",
    text: "you're truly my favorite person in the whole universe. so i'll take every risk i can to find you again. so i'll be in area 51 at 5 on saturday as you know so i'll ask you this",
    cat: "/cats/pleasecat.gif",
    replayBtn: "replay from the beginning 🐾",
    proposal: {
      question: "will you go out with me cupcake?",
      gif: "/cats/flowercat.gif",
      yesBtn: "yes",
      noBtn: "no",
      acceptedTitle: "she said yes!!! 🎉",
      acceptedText: "knew it. saturday it is then cupcake. i'll wait for you for maximum an hour and a half. i won't call you but once when im in there already and hope i'm not blocked (it'll be one of the scariest shit i've ever done)",
      tarha: {
        badge: "متنسيش الطرحة",
        ok: "okay okay 🤍",
        no: "لأ",
        noReactions: [
          "خخخخ؟؟",
          "اسمعي الكلام",
          "this is not a request",
          "متنسيش الطرحة !!!",
          "أنا بجد بقولك متنسيش الطرحة",
          "الطرحة. لا تنسيها.",
          "اوكي بس جد متنسيش الطرحة",
          "انتي بتعمي ولا ايه",
          "الطـــرحـة.",
        ],
      },
    },
  },
};

export function getCatReactionForScore(val: number) {
  if (val <= 3) {
    return {
      key: "low",
      text: story.missQuestion.reactions.low.text,
      subtext: story.missQuestion.reactions.low.subtext,
      badgeColor: "bg-[#FED7AA] text-[#C2410C]",
    };
  }
  if (val <= 6) {
    return {
      key: "medium",
      text: story.missQuestion.reactions.medium.text,
      subtext: story.missQuestion.reactions.medium.subtext,
      badgeColor: "bg-[#FED7AA] text-[#C2410C]",
    };
  }
  if (val <= 9) {
    return {
      key: "high",
      text: story.missQuestion.reactions.high.text,
      subtext: story.missQuestion.reactions.high.subtext,
      badgeColor: "bg-[#FF8A3D] text-[#FFF7ED]",
    };
  }
  return {
    key: "ten",
    text: story.missQuestion.reactions.ten.text,
    subtext: story.missQuestion.reactions.ten.subtext,
    badgeColor: "bg-[#F97316] text-[#FFF7ED]",
  };
}

