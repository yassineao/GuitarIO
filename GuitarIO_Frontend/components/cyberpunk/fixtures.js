// fixtures.js
export const FIXTURES = {
  headerMenu: [
    { notificationCount: 0, text: "Home" },
    { isActive: true, notificationCount: 11, text: "Messages" },
    { notificationCount: 0, text: "Shop" },
    { notificationCount: 0, text: "Map" },
    { notificationCount: 0, text: "Files" }
  ],
  feed: [
    { id: "5ba5", name: "Novice", unread: 3 },
    { id: "4f22", name: "intermediate" },
    { id: "fee9", name: "advanced" },
    { id: "a0cc", name: "Extrem" },
  ],
  genres: [
    { id: "cc23", isOnline: true, unread: 5, name: "pop" },
    { id: "95b4", isOnline: false, name: "jazz", unread: 1 },
    { id: "10cf", isOnline: true, name: "blues" },
    { id: "e466", name: "country" },
    { id: "ca0b", isOnline: true, name: "folk" },
    { id: "ca0wb", name: "rock" }
    
  ],
  song: [
    {
      dateTime: "2077-10-09T11:04:57Z",
      title: "My Song",
      artist: "Me",
      content: `
[C]Hello [G]world

[F]This is Cho[C]rdPro
`,
      author: {
        id: "d12c",
        name: "V.M. Vargas"
      }
    }
  ],
  messages: [
    {
      id: "fd0cf",
      content: `
Do yOu Want TO chALlenGe youR SkilLs anD EArn SoME edDIEs?
\n
I hAVe A miSSion fOR yOU.

choose yOUR DIffICUlTy LEVel on the left side of THE sCREEN AND click "ACCept"
`,
      dateTime: "2077-10-09T11:04:57Z",
      answers: [
        { id: "a1", content: "Accept" },
        { id: "a2", content: "Decline" }
      ],  
      author: {
        id: "d12c",
        name: "V.M. Vargas"
      }
    }
  ]
};
